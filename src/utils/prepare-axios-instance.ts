import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ExtendedInternalAxiosRequestConfig } from '../types/axios';
import SharetribeSdk, { QUERY_PARAMETERS } from '../sdk';
import parameterSerializer from './parameter-serializer';
import { dataToType, typeToData } from './convert-types';

// Utility functions
export const isTokenExpired = (status: number) => [401, 403].includes(status);
export const prepareAuthorizationHeader = (data: any) => `${data.token_type} ${data.access_token}`;

// Interceptor handlers
export function handleResponseSuccess(sdk: SharetribeSdk) {
  return function onFulfilled(response: AxiosResponse): AxiosResponse {
    const { data } = response;

    if (data?.access_token) {
      sdk.sdkConfig.tokenStore!.setToken(data);
    }

    dataToType(data, sdk);

    return response;
  };
}

export async function handleResponseFailure(sdk: SharetribeSdk, error: AxiosError | any) {
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

export async function handleRequestSuccess(sdk: SharetribeSdk, requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
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
      sdk.sdkConfig.tokenStore!.setToken(response.data);
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
export function prepareAxiosInstance(sdk: SharetribeSdk) {
  sdk.axios.interceptors.response.use(handleResponseSuccess(sdk), (error: AxiosError) => handleResponseFailure(sdk, error));
  sdk.axios.interceptors.request.use((config: InternalAxiosRequestConfig) => handleRequestSuccess(sdk, config));
  sdk.axios.defaults.paramsSerializer = parameterSerializer;
}

export default prepareAxiosInstance;
