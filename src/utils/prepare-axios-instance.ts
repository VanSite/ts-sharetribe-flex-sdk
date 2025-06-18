import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ExtendedInternalAxiosRequestConfig } from "../types";
import SharetribeSdk from "../sdk";
import parameterSerializer from "./parameter-serializer";
import IntegrationSdk from "../integrationSdk";
import { createTransitConverters } from "./transit";
import axiosRetry, { IAxiosRetryConfig } from "axios-retry";
export const QUERY_PARAMETERS = [
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
export const isTokenUnauthorized = (status: number) => [401].includes(status);
export const isTokenExpired = (status: number) => [401, 403].includes(status);
export const isAuthTokenUnauthorized = (error: AxiosError) =>
  error.response?.status === 401 && error?.config?.method === "post" && error?.config?.url?.includes("/auth/token")

export const routeNeedsTrustedUser = (
  requestConfig: InternalAxiosRequestConfig,
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

// Interceptor handlers
export function handleResponseSuccess(sdk: SharetribeSdk | IntegrationSdk) {
  return function onFulfilled(response: AxiosResponse): AxiosResponse {
    if (!sdk.sdkConfig.tokenStore) {
      throw new Error("Token store is not set");
    }

    if (isTransit(response)) {
      const { reader } = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      response.data = reader.read(response.data);
    } else if (isJson(response)) {
      response.data = JSON.parse(response.data);
    }

    if (response?.data?.access_token) {
      sdk.sdkConfig.tokenStore.setToken(response.data);
    }

    if (response?.data?.revoked) {
      sdk.sdkConfig.tokenStore.removeToken();
    }

    return response;
  };
}

export async function handleResponseFailure(
  sdk: SharetribeSdk | IntegrationSdk,
  error: AxiosError | any
) {
  if (!sdk.sdkConfig.tokenStore) {
    throw new Error("Token store is not set");
  }

  try {
    const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;

    // Parse response data if needed
    if (error.response && isTransit(error.response)) {
      const { reader } = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      error.response.data = reader.read(error.response.data as string);
    } else if (error.response && isJson(error.response)) {
      error.response.data = JSON.parse(error.response.data as string);
    }

    if (error.response && isTokenUnauthorized(error.response.status) && originalRequest.url?.includes("/auth/token")) {
      sdk.sdkConfig.tokenStore.removeToken();
      return Promise.reject(error);
    }

    // Handle token refresh on 401/403 errors
    if (error.response && isTokenExpired(error.response.status)) {
      const token = sdk.sdkConfig.tokenStore.getToken();
      if (token && token.refresh_token) {
        // Get a new token
        const response = await sdk.auth.token<"refresh-token">({
          client_id: sdk.sdkConfig.clientId,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
        });

        // Update the request with the new token
        originalRequest.headers.Authorization = prepareAuthorizationHeader(
          response.data
        );

        // Store the new token
        sdk.sdkConfig.tokenStore.setToken(response.data);

        // Retry the request
        return sdk.axios(originalRequest);
      }

      if (isAuthTokenUnauthorized(error)) {
        return Promise.reject({
          status: 401,
          statusText: 'Unauthorized',
          data: 'Unauthorized'
        });
      }

      // Token is a public-read token or does not exist
      // We need to get a new public-read token
      if (token && !token.refresh_token || !token) {
        // Get a new public-read token
        const response = await sdk.auth.token<"public-read">({
          client_id: sdk.sdkConfig.clientId,
          grant_type: "client_credentials",
          scope: "public-read",
        });

        originalRequest.headers.Authorization = prepareAuthorizationHeader(
          response.data
        );

        // Store the new token
        sdk.sdkConfig.tokenStore.setToken(response.data);

        return sdk.axios(originalRequest);
      }
    }

    // Handle trusted user check
    if (
      error.response &&
      isTokenUnauthorized(error.response.status) &&
      routeNeedsTrustedUser(originalRequest, sdk)
    ) {
      const token = sdk.sdkConfig.tokenStore.getToken();
      if (token?.scope !== "trusted:user") {
        console.error("Token is not trusted:user");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  } catch (e) {
    console.error("Error in handleResponseFailure:", e);
    return Promise.reject(e);
  }
}

export async function handleRequestSuccess(
  sdk: SharetribeSdk | IntegrationSdk,
  requestConfig: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  if (!sdk.sdkConfig.tokenStore) {
    throw new Error("Token store is not set");
  }

  if (requestConfig.url?.includes("auth/revoke")) {
    const authToken = sdk.sdkConfig.tokenStore.getToken();
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
    const authToken = sdk.sdkConfig.tokenStore.getToken();
    if (authToken) {
      requestConfig.headers.Authorization =
        prepareAuthorizationHeader(authToken);
    } else {
      let response: AxiosResponse<any>;
      if (sdk instanceof SharetribeSdk) {
        response = await sdk.auth.token<"public-read">({
          client_id: sdk.sdkConfig.clientId,
          grant_type: "client_credentials",
          scope: "public-read",
        });
      } else if (sdk instanceof IntegrationSdk) {
        if (!sdk.sdkConfig.clientSecret) {
          throw new Error("clientSecret is required for integration SDK");
        }

        response = await sdk.auth.token<"integ">({
          client_id: sdk.sdkConfig.clientId,
          client_secret: sdk.sdkConfig.clientSecret,
          grant_type: "client_credentials",
          scope: "integ",
        });
      } else {
        throw new Error("Invalid SDK instance");
      }

      sdk.sdkConfig.tokenStore.setToken(response.data);

      requestConfig.headers.Authorization = prepareAuthorizationHeader(
        response.data
      );
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
      const { writer } = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      requestConfig.data = writer.write(requestConfig.data);
      requestConfig.headers["Content-Type"] = "application/transit+json";
    }
  }

  return requestConfig;
}

export function createAxiosConfig(
  sdk: SharetribeSdk | IntegrationSdk,
  config: AxiosRequestConfig
) {
  config.headers = {
    ...config.headers,
    Accept: "application/transit+json",
  };
  config.transformRequest = (v) => v;
  config.transformResponse = (v) => v;
  if (sdk.sdkConfig.transitVerbose) {
    config.headers["X-Transit-Verbose"] = true;
  }
  return config;
}

// Main setup function
export function prepareAxiosInstance(sdk: SharetribeSdk | IntegrationSdk) {
  try {
    const retryConfig: IAxiosRetryConfig = {
      retries: 3, // Number of retries
      retryDelay: axiosRetry.exponentialDelay,
    };

    // Use type assertion to bypass TypeScript error
    (axiosRetry as any)(sdk.axios, retryConfig);
  } catch (e) {
    console.warn("Failed to initialize axios-retry:", e);
  }

  sdk.axios.interceptors.response.use(
    handleResponseSuccess(sdk),
    (error: AxiosError) => handleResponseFailure(sdk, error)
  );
  sdk.axios.interceptors.request.use((config: InternalAxiosRequestConfig) =>
    handleRequestSuccess(sdk, config)
  );
  sdk.axios.defaults.paramsSerializer = parameterSerializer;
}
