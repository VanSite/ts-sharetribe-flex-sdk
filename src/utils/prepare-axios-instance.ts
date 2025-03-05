import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ExtendedInternalAxiosRequestConfig } from "../types/axios";
import SharetribeSdk from "../sdk";
import parameterSerializer from "./parameter-serializer";
import IntegrationSdk from "../integrationSdk";
import { createTransitConverters } from "./transit";

export const QUERY_PARAMETERS = [
  "include",
  "page",
  "perPage",
  "expand",
  "fields",
  "limit",
];

// Utility functions
export const isTokenUnauthorized = (status: number) => [401].includes(status);
export const isTokenExpired = (status: number) => [401, 403].includes(status);
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
    if (typeof response.data === "string") {
      const { reader } = createTransitConverters(sdk.sdkConfig.typeHandlers, {
        verbose: sdk.sdkConfig.transitVerbose,
      });
      response.data = reader.read(response.data);
    }

    if (response?.data?.access_token) {
      sdk.sdkConfig.tokenStore!.setToken(response.data);
    }
    if (response?.data?.revoked) {
      sdk.sdkConfig.tokenStore!.removeToken();
    }

    return response;
  };
}

export async function handleResponseFailure(
  sdk: SharetribeSdk | IntegrationSdk,
  error: AxiosError | any
) {
  const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;

  if (typeof error.response.data === "string") {
    const { reader } = createTransitConverters(sdk.sdkConfig.typeHandlers, {
      verbose: sdk.sdkConfig.transitVerbose,
    });
    error.response.data = reader.read(error.response.data);
  }

  if (
    isTokenUnauthorized(error.response?.status) &&
    routeNeedsTrustedUser(originalRequest, sdk)
  ) {
    const token = await sdk.sdkConfig.tokenStore!.getToken();
    if (token?.scope !== "trusted:user") {
      console.error("Token is not trusted:user");
      return Promise.reject(error);
    }
  }

  if (isTokenExpired(error.response?.status) && !originalRequest._retry) {
    const token = await sdk.sdkConfig.tokenStore!.getToken();
    if (token && token.refresh_token) {
      originalRequest._retry = true;
      const response = await sdk.auth.token<"refresh-token">({
        client_id: sdk.sdkConfig.clientId,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });
      originalRequest.headers.Authorization = prepareAuthorizationHeader(
        response.data
      );
      sdk.sdkConfig.tokenStore!.setToken(response.data);
      return sdk.axios(originalRequest);
    }
  }
  return Promise.reject(error);
}

export async function handleRequestSuccess(
  sdk: SharetribeSdk | IntegrationSdk,
  requestConfig: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  // Anonymous requests are allowed to use the public-read scope
  const isAnonymousRequest =
    requestConfig?.data?.grant_type === "client_credentials" &&
    requestConfig.data.scope === "public-read";
  if (isAnonymousRequest) {
    return requestConfig;
  }

  // when the request has no Authorization header, we need to add it
  if (!requestConfig.headers.Authorization) {
    const authToken = await sdk.sdkConfig.tokenStore!.getToken();
    if (authToken) {
      requestConfig.headers.Authorization =
        prepareAuthorizationHeader(authToken);
    } else {
      const response = await sdk.auth.token<"public-read">({
        client_id: sdk.sdkConfig.clientId,
        grant_type: "client_credentials",
        scope: "public-read",
      });
      requestConfig.headers.Authorization = prepareAuthorizationHeader(
        response.data
      );
    }
  }

  // Convert data parameter to query Parameters
  if (requestConfig.data) {
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
  sdk.axios.interceptors.response.use(
    handleResponseSuccess(sdk),
    (error: AxiosError) => handleResponseFailure(sdk, error)
  );
  sdk.axios.interceptors.request.use((config: InternalAxiosRequestConfig) =>
    handleRequestSuccess(sdk, config)
  );
  sdk.axios.defaults.paramsSerializer = parameterSerializer;
}
