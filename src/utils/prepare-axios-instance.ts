import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {ExtendedInternalAxiosRequestConfig} from '../types/axios';
import SharetribeSdk from '../sdk';
import parameterSerializer from './parameter-serializer';
import {dataToType, typeToData} from './convert-types';
import IntegrationSdk from "../integrationSdk";

export const QUERY_PARAMETERS = [
  'include',
  'page',
  'perPage',
  'expand',
  'fields',
  'limit',
]

// Utility functions
export const isTokenExpired = (status: number) => [401, 403].includes(status);
export const prepareAuthorizationHeader = (data: any) => `${data.token_type} ${data.access_token}`;

// Interceptor handlers
export function handleResponseSuccess(sdk: SharetribeSdk | IntegrationSdk) {
  return function onFulfilled(response: AxiosResponse): AxiosResponse {
    const {data} = response;

    if (data?.access_token) {
      sdk.sdkConfig.tokenStore!.setToken(data);
    }
    if (data?.revoked) {
      sdk.sdkConfig.tokenStore!.removeToken();
    }

    dataToType(data, sdk);

    return response;
  };
}

export async function handleResponseFailure(sdk: SharetribeSdk | IntegrationSdk, error: AxiosError | any) {
  const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;
  if (isTokenExpired(error.response?.status) && !originalRequest._retry) {
    const token = await sdk.sdkConfig.tokenStore!.getToken();
    if (token && token.refresh_token) {
      originalRequest._retry = true;
      const response = await sdk.auth.token<'refresh-token'>({
        client_id: sdk.sdkConfig.clientId,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token
      });
      originalRequest.headers.Authorization = prepareAuthorizationHeader(response.data);
      sdk.sdkConfig.tokenStore!.setToken(response.data);
      return sdk.axios(originalRequest);
    }
  }
  return Promise.reject(error);
}

export async function handleRequestSuccess(sdk: SharetribeSdk | IntegrationSdk, requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  const isAnonymousRequest = requestConfig?.data?.grant_type === 'client_credentials' && requestConfig.data.scope === 'public-read';
  if (isAnonymousRequest) {
    return requestConfig;
  }

  const requestUrl = requestConfig.url!;
  const found = Object.entries(sdk).find(([_, value]) => {
    if (typeof value === "object") {
      return Object.entries(value).find(([key, endpoint]) => {
        if (key === 'endpoint' && typeof endpoint === "string") {
          return requestUrl.substring(0, requestUrl.lastIndexOf('/')) === endpoint;
        }
      });
    }
  }) as [string, { authRequired: boolean }] | undefined;
  if (found && found[1].authRequired) {

  }

  if (!requestConfig.headers.Authorization) {
    const authToken = await sdk.sdkConfig.tokenStore!.getToken();
    if (authToken) {
      requestConfig.headers.Authorization = prepareAuthorizationHeader(authToken);
    } else {
      const response = await sdk.auth.token<'public-read'>({
        client_id: sdk.sdkConfig.clientId,
        grant_type: 'client_credentials',
        scope: 'public-read'
      });
      requestConfig.headers.Authorization = prepareAuthorizationHeader(response.data);
    }
  }

  if (requestConfig.data) {
    Object.keys(requestConfig.data).forEach(key => {
      const isQueryParameter = QUERY_PARAMETERS.find(param => key === param || key.startsWith(param));
      if (isQueryParameter) {
        requestConfig.params = {
          ...requestConfig.params,
          [key]: Array.isArray(requestConfig.data[key]) ? requestConfig.data[key].join(',') : requestConfig.data[key]
        };
        delete requestConfig.data[key];
      }
    });
    typeToData(requestConfig.data, sdk);
  }
  return requestConfig;
}

// Main setup function
export function prepareAxiosInstance(sdk: SharetribeSdk | IntegrationSdk) {
  sdk.axios.interceptors.response.use(handleResponseSuccess(sdk), (error: AxiosError) => handleResponseFailure(sdk, error));
  sdk.axios.interceptors.request.use((config: InternalAxiosRequestConfig) => handleRequestSuccess(sdk, config));
  sdk.axios.defaults.paramsSerializer = parameterSerializer;
}

export default prepareAxiosInstance;
