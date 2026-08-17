import type {
  AnonymousTokenRequest,
  AuthToken,
  ExtendedInternalHttpRequestConfig,
  HttpRequestConfig,
  HttpResponse,
  IntegrationTokenRequest,
  InternalHttpRequestConfig,
  RefreshTokenRequest
} from "../types";
import SharetribeSdk from "../sdk";
import parameterSerializer from "./parameter-serializer";
import IntegrationSdk from "../integrationSdk";
import {createTransitConverters} from "./transit";
import {HttpError} from "./http-client";
import {createSharetribeApiError} from "./util";

/**
 * Determines if a new token should be stored, preventing anonymous (public-read)
 * tokens from overwriting authenticated user tokens.
 *
 * Authenticated tokens are those with scope user/trusted:user/integ,
 * or legacy tokens that include a refresh_token.
 */
const AUTHENTICATED_SCOPES = new Set(["user", "trusted:user", "integ"]);

const normalizeScopes = (scope: AuthToken["scope"]): string[] => {
  if (!scope) {
    return [];
  }

  if (Array.isArray(scope)) {
    return scope;
  }

  return scope.split(" ").filter(Boolean);
};

const isAuthenticatedToken = (token: Partial<AuthToken> | null | undefined): boolean => {
  if (!token) {
    return false;
  }

  const scopes = normalizeScopes(token.scope as AuthToken["scope"]);
  if (scopes.length > 0) {
    return scopes.some((scope) => AUTHENTICATED_SCOPES.has(scope));
  }

  // Backward compatibility for legacy tokens without scope information.
  return Boolean(token.refresh_token);
};

const isTokenPayload = (payload: any): payload is AuthToken =>
  Boolean(payload) &&
  typeof payload === "object" &&
  typeof payload.access_token === "string" &&
  typeof payload.token_type === "string";

const shouldStoreToken = (
  existingToken: AuthToken | null,
  newToken: Partial<AuthToken>
): boolean => {
  if (!existingToken) {
    return true;
  }

  if (isAuthenticatedToken(newToken)) {
    return true;
  }

  return !isAuthenticatedToken(existingToken);
};

// Per-SDK-instance token refresh manager to prevent race conditions across SDK instances
interface RefreshSubscriber {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

class TokenRefreshManager {
  private isRefreshing = false;
  private refreshSubscribers: RefreshSubscriber[] = [];

  subscribeTokenRefresh(resolve: (token: string) => void, reject: (error: Error) => void): void {
    this.refreshSubscribers.push({ resolve, reject });
  }

  onTokenRefreshed(token: string): void {
    this.refreshSubscribers.forEach(({ resolve }) => resolve(token));
    this.refreshSubscribers = [];
  }

  onTokenRefreshFailed(error: Error): void {
    this.refreshSubscribers.forEach(({ reject }) => reject(error));
    this.refreshSubscribers = [];
  }

  get refreshing(): boolean {
    return this.isRefreshing;
  }

  setRefreshing(value: boolean): void {
    this.isRefreshing = value;
  }
}

const sdkRefreshManagers = new WeakMap<SharetribeSdk | IntegrationSdk, TokenRefreshManager>();

function getOrCreateRefreshManager(sdk: SharetribeSdk | IntegrationSdk): TokenRefreshManager {
  let manager = sdkRefreshManagers.get(sdk);
  if (!manager) {
    manager = new TokenRefreshManager();
    sdkRefreshManagers.set(sdk, manager);
  }
  return manager;
}

/**
 * Sanitizes error objects before logging to prevent sensitive data exposure.
 */
const sanitizeError = (error: unknown): object => {
  if (!(error instanceof Error)) {
    return {message: String(error)};
  }

  const sanitized: Record<string, unknown> = {
    name: error.name,
    message: error.message,
  };

  if (error instanceof HttpError) {
    sanitized.status = error.response?.status;
    sanitized.url = error.config?.url;
    sanitized.method = error.config?.method;
    // Explicitly exclude: config.headers (may contain Authorization), config.data (may contain credentials)
  }

  return sanitized;
};

/**
 * Marker key used to remember the raw (pre-transit) request body when the
 * same config is sent through the request interceptor more than once. The
 * 401/403 token-refresh path re-invokes the client with `error.config`,
 * which runs this interceptor again -- so without this, a re-issued POST
 * would have its already-transit-serialized `data` string serialized a
 * second time (see `handleRequestSuccess`). (Transport-level retries are
 * unaffected: they happen below the interceptors and reuse the final
 * config as-is.)
 *
 * The raw body is wrapped in `{ value }` rather than stored directly, so
 * the marker stays detectable even when the raw value it carries is
 * legitimately `undefined` or `null`.
 */
const RAW_TRANSIT_DATA_KEY = "__sdkRawTransitData";

type ConfigWithRawTransitData = InternalHttpRequestConfig & {
  [RAW_TRANSIT_DATA_KEY]?: { value: unknown };
};

const QUERY_PARAMETERS = [
  "include",
  "page",
  "perPage",
  "expand",
  "fields",
  "limit",
];

const isTransit = (res: any) => {
  const headers = res.headers || {};
  const contentType = headers["content-type"] || "";

  return contentType.startsWith("application/transit+json");
};

const isJson = (res: any) => {
  const headers = res.headers || {};
  const contentType = headers["content-type"] || "";

  return contentType.startsWith("application/json");
};

// Utility functions
const isTokenUnauthorized = (status: number) => [401].includes(status);
export const isTokenExpired = (status: number) => [401, 403].includes(status);
const isAuthTokenUnauthorized = (error: HttpError) =>
  error.response?.status === 401 && error?.config?.method === "post" && error?.config?.url?.includes("/auth/token")

const routeNeedsTrustedUser = (
  requestConfig: InternalHttpRequestConfig,
  sdk: SharetribeSdk | IntegrationSdk
) => {
  const requestUrl = requestConfig.url!;
  const found = Object.entries(sdk).find(([_, value]) => {
    if (typeof value === "object") {
      return Object.entries(value).find(([key, endpoint]) => {
        if (key === "endpoint" && typeof endpoint === "string") {
          return (
            requestUrl.substring(0, requestUrl.lastIndexOf("/")) === endpoint
          );
        }
      });
    }
  }) as [string, { authRequired: boolean }] | undefined;
  return found && found[1].authRequired;
};

export const prepareAuthorizationHeader = (data: any) =>
  `${data.token_type} ${data.access_token}`;

// Interceptor handlers.
// The two big handlers below intentionally keep the exact pre-4.0 control flow
// (ported 1:1 from the axios interceptors, covered by the test suite) — don't
// restructure them as part of unrelated changes.
export function handleResponseSuccess(sdk: SharetribeSdk | IntegrationSdk) {
  return async function onFulfilled(response: HttpResponse): Promise<HttpResponse> {
    if (!sdk.sdkConfig.tokenStore) {
      throw new Error("Token store is not set");
    }

    if (isTransit(response)) {
      const {reader} = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      if (typeof response.data === 'string') {
        response.data = reader.read(response.data);
      }
    } else if (isJson(response)) {
      if (typeof response.data === 'string') {
        response.data = JSON.parse(response.data);
      }
    }

    if (isTokenPayload(response?.data)) {
      const existingToken = await sdk.sdkConfig.tokenStore.getToken();
      if (shouldStoreToken(existingToken, response.data)) {
        await sdk.sdkConfig.tokenStore.setToken(response.data);
      }
    }

    if (response?.data?.revoked) {
      await sdk.sdkConfig.tokenStore.removeToken();
    }

    return response;
  };
}

// fallow-ignore-next-line complexity
export async function handleResponseFailure(
  sdk: SharetribeSdk | IntegrationSdk,
  error: HttpError | any
) {
  if (!sdk.sdkConfig.tokenStore) {
    throw new Error("Token store is not set");
  }

  try {
    const originalRequest = error.config as ExtendedInternalHttpRequestConfig;

    // Parse response data if needed
    if (error.response && isTransit(error.response)) {
      const {reader} = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      if (typeof error.response.data === 'string') {
        error.response.data = reader.read(error.response.data as string);
      }
    } else if (error.response && isJson(error.response)) {
      if (typeof error.response.data === 'string') {
        error.response.data = JSON.parse(error.response.data as string);
      }
    }

    if (error.response && isTokenUnauthorized(error.response.status) && originalRequest.url?.includes("/auth/token")) {
      await sdk.sdkConfig.tokenStore.removeToken();
      return Promise.reject(createSharetribeApiError(error));
    }

    // Handle token refresh on 401/403 errors
    if (error.response && isTokenExpired(error.response.status)) {
      // Prevent infinite retry loop
      if (originalRequest._retry) {
        return Promise.reject(createSharetribeApiError(error));
      }
      originalRequest._retry = true;

      const token = await sdk.sdkConfig.tokenStore.getToken();
      if (token && token.refresh_token) {
        const refreshManager = getOrCreateRefreshManager(sdk);

        // Use mutex to prevent concurrent token refresh
        if (refreshManager.refreshing) {
          // Wait for the ongoing refresh to complete
          return new Promise((resolve, reject) => {
            refreshManager.subscribeTokenRefresh(
              (newToken: string) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(sdk.httpClient(originalRequest));
              },
              (error: Error) => {
                reject(error);
              }
            );
          });
        }

        refreshManager.setRefreshing(true);

        try {
          // Get a new token
          const response = await sdk.auth.token<RefreshTokenRequest>({
            client_id: sdk.sdkConfig.clientId,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          });

          // Store the new token
          await sdk.sdkConfig.tokenStore.setToken(response.data);

          // Notify all waiting requests
          refreshManager.onTokenRefreshed(response.data.access_token);

          // Update the request with the new token
          originalRequest.headers.Authorization = prepareAuthorizationHeader(
            response.data
          );

          return sdk.httpClient(originalRequest);
        } catch (refreshError) {
          // createSharetribeApiError now always returns an Error instance, but
          // keep a defensive wrap so a stray non-Error never stringifies to
          // "[object Object]" in Sentry.
          const wrappedError = refreshError instanceof Error
            ? refreshError
            : new Error((refreshError as any)?.message ?? "Token refresh failed");
          refreshManager.onTokenRefreshFailed(wrappedError);
          throw wrappedError;
        } finally {
          refreshManager.setRefreshing(false);
        }
      }

      if (isAuthTokenUnauthorized(error)) {
        return Promise.reject(createSharetribeApiError(error));
      }

      // Token is a public-read token or does not exist
      // We need to get a new public-read token
      if (token && !token.refresh_token || !token) {
        // Get a new public-read token
        const response = await sdk.auth.token<AnonymousTokenRequest>({
          client_id: sdk.sdkConfig.clientId,
          grant_type: "client_credentials",
          scope: "public-read",
        });

        originalRequest.headers.Authorization = prepareAuthorizationHeader(
          response.data
        );

        // Store the new token only if it won't overwrite a user token
        const currentToken = await sdk.sdkConfig.tokenStore.getToken();
        if (shouldStoreToken(currentToken, response.data)) {
          await sdk.sdkConfig.tokenStore.setToken(response.data);
        }

        return sdk.httpClient(originalRequest);
      }
    }

    // Handle trusted user check
    if (
      error.response &&
      isTokenUnauthorized(error.response.status) &&
      routeNeedsTrustedUser(originalRequest, sdk)
    ) {
      const token = await sdk.sdkConfig.tokenStore.getToken();
      if (token?.scope !== "trusted:user") {
        console.error("Token does not have required scope");
        return Promise.reject(createSharetribeApiError(error));
      }
    }

    // Default error handling
    return Promise.reject(createSharetribeApiError(error));
  } catch (e) {
    // Sanitize error before logging to prevent sensitive data exposure
    console.error("Error in handleResponseFailure:", sanitizeError(e));
    return Promise.reject(e);
  }
}

// fallow-ignore-next-line complexity
export async function handleRequestSuccess(
  sdk: SharetribeSdk | IntegrationSdk,
  requestConfig: InternalHttpRequestConfig
): Promise<InternalHttpRequestConfig> {
  if (!sdk.sdkConfig.tokenStore) {
    throw new Error("Token store is not set");
  }

  if (requestConfig.url?.includes("auth/revoke")) {
    const authToken = await sdk.sdkConfig.tokenStore.getToken();
    requestConfig.headers.Authorization = prepareAuthorizationHeader(authToken);
    return requestConfig;
  }

  if (
    requestConfig.headers["Content-Type"] ===
    "application/x-www-form-urlencoded"
  ) {
    return requestConfig;
  }

  // Anonymous requests are allowed to use the public-read scope
  const isAnonymousRequest =
    requestConfig?.data?.grant_type === "client_credentials" &&
    requestConfig?.data?.scope === "public-read";
  if (isAnonymousRequest) {
    return requestConfig;
  }

  // when the request has no Authorization header, we need to add it
  if (!requestConfig.headers.Authorization) {
    const authToken = await sdk.sdkConfig.tokenStore.getToken();
    if (authToken) {
      requestConfig.headers.Authorization =
        prepareAuthorizationHeader(authToken);
    } else {
      let response: HttpResponse<any>;
      if (sdk instanceof SharetribeSdk) {
        response = await sdk.auth.token<AnonymousTokenRequest>({
          client_id: sdk.sdkConfig.clientId,
          grant_type: "client_credentials",
          scope: "public-read",
        });
      } else if (sdk instanceof IntegrationSdk) {
        if (!sdk.sdkConfig.clientSecret) {
          throw new Error("clientSecret is required for integration SDK");
        }

        response = await sdk.auth.token<IntegrationTokenRequest>({
          client_id: sdk.sdkConfig.clientId,
          client_secret: sdk.sdkConfig.clientSecret,
          grant_type: "client_credentials",
          scope: "integ",
        });
      } else {
        throw new Error("Invalid SDK instance");
      }

      // Re-check: a user token may have been stored while we were fetching
      const currentToken = await sdk.sdkConfig.tokenStore.getToken();
      if (currentToken?.refresh_token) {
        requestConfig.headers.Authorization = prepareAuthorizationHeader(currentToken);
      } else {
        await sdk.sdkConfig.tokenStore.setToken(response.data);
        requestConfig.headers.Authorization = prepareAuthorizationHeader(
          response.data
        );
      }
    }
  }

  // Convert data parameter to query Parameters
  if (requestConfig.data) {
    if (requestConfig.data instanceof FormData) {
      const newFormData = new FormData();
      requestConfig.data.forEach((value, key) => {
        const isQueryParameter = QUERY_PARAMETERS.find(
          (param) => key === param || key.startsWith(param)
        );
        if (isQueryParameter) {
          requestConfig.params = {
            ...requestConfig.params,
            [key]: Array.isArray(value) ? value.join(",") : value,
          };
        } else {
          newFormData.append(key, value);
        }
      });
      requestConfig.data = newFormData;
    } else {
      Object.keys(requestConfig.data).forEach((key) => {
        const isQueryParameter = QUERY_PARAMETERS.find(
          (param) => key === param || key.startsWith(param)
        );
        if (isQueryParameter) {
          requestConfig.params = {
            ...requestConfig.params,
            [key]: Array.isArray(requestConfig.data[key])
              ? requestConfig.data[key].join(",")
              : requestConfig.data[key],
          };
          delete requestConfig.data[key];
        }
      });
    }
  }

  // Turn sdkTypes into non sdkType objects
  if (requestConfig.method === "post") {
    if (requestConfig.url?.endsWith("/upload")) {
      delete requestConfig.headers["Content-Type"]
    } else {
      const configWithRawData = requestConfig as ConfigWithRawTransitData;

      if (RAW_TRANSIT_DATA_KEY in configWithRawData) {
        // Retry / re-issue of this exact request config: the interceptor
        // already ran once and replaced `data` with the transit-serialized
        // result. Restore the original body before serializing again, or
        // we'd serialize an already-serialized transit string.
        requestConfig.data = configWithRawData[RAW_TRANSIT_DATA_KEY]!.value;
      } else {
        configWithRawData[RAW_TRANSIT_DATA_KEY] = { value: requestConfig.data };
      }

      const {writer} = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      requestConfig.data = writer.write(requestConfig.data);
      requestConfig.headers["Content-Type"] = "application/transit+json";
    }
  }

  return requestConfig;
}

export function createHttpConfig(
  sdk: SharetribeSdk | IntegrationSdk,
  config: HttpRequestConfig
) {
  config.headers = {
    ...config.headers,
    Accept: "application/transit+json",
  };
  if (sdk.sdkConfig.transitVerbose) {
    config.headers["X-Transit-Verbose"] = true;
  }
  return config;
}

// Main setup function. Transport-level retries (3x, exponential backoff)
// are built into the http client itself — see utils/http-client.ts.
export function prepareHttpClient(sdk: SharetribeSdk | IntegrationSdk) {
  sdk.httpClient.interceptors.response.use(
    handleResponseSuccess(sdk),
    (error: HttpError) => handleResponseFailure(sdk, error)
  );
  sdk.httpClient.interceptors.request.use((config: InternalHttpRequestConfig) =>
    handleRequestSuccess(sdk, config)
  );
  sdk.httpClient.defaults.paramsSerializer = parameterSerializer;
}
