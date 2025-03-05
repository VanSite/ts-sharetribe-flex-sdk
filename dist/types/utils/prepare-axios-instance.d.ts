import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import SharetribeSdk from "../sdk";
import IntegrationSdk from "../integrationSdk";
export declare const QUERY_PARAMETERS: string[];
export declare const isTokenUnauthorized: (status: number) => boolean;
export declare const isTokenExpired: (status: number) => boolean;
export declare const routeNeedsTrustedUser: (requestConfig: InternalAxiosRequestConfig, sdk: SharetribeSdk | IntegrationSdk) => boolean | undefined;
export declare const prepareAuthorizationHeader: (data: any) => string;
export declare function handleResponseSuccess(sdk: SharetribeSdk | IntegrationSdk): (response: AxiosResponse) => AxiosResponse;
export declare function handleResponseFailure(sdk: SharetribeSdk | IntegrationSdk, error: AxiosError | any): Promise<AxiosResponse<any, any>>;
export declare function handleRequestSuccess(sdk: SharetribeSdk | IntegrationSdk, requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>;
export declare function createAxiosConfig(sdk: SharetribeSdk | IntegrationSdk, config: AxiosRequestConfig): AxiosRequestConfig<any>;
export declare function prepareAxiosInstance(sdk: SharetribeSdk | IntegrationSdk): void;
//# sourceMappingURL=prepare-axios-instance.d.ts.map