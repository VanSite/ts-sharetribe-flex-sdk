import { SdkConfig } from './config';
export type ApiConfigs<I extends boolean = false> = I extends false ? {
    api: (config: SdkConfig) => {
        headers: {
            'X-Transit-Verbose'?: 'true' | 'false';
            Accept: 'application/transit+json';
        };
        baseUrl: string;
    };
    auth: (config: SdkConfig) => {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded';
            Accept: 'application/json';
        };
        baseUrl: string;
    };
    assets: (config: SdkConfig) => {
        headers: {
            Accept: 'application/json';
        };
        baseUrl: string;
    };
} : {
    integrationApi: (config: SdkConfig) => {
        headers: {
            'X-Transit-Verbose'?: 'true' | 'false';
            Accept: 'application/transit+json';
        };
        baseUrl: string;
    };
};
