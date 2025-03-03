/**
 * @fileoverview Defines API configuration types for different environments and endpoints.
 */
import { SdkConfig } from './config';
/**
 * Configuration type for various API endpoints.
 *
 * - When `I` is `false`, provides configurations for `api`, `auth`, and `assets` endpoints.
 * - When `I` is `true`, provides configurations for the `integrationApi` endpoint.
 */
export type ApiConfigs<I extends boolean = false> = I extends false ? {
    /**
     * Configuration for the main API.
     */
    api: (config: SdkConfig) => {
        headers: {
            /**
             * Optional header to enable verbose transit responses.
             */
            'X-Transit-Verbose'?: 'true' | 'false';
            /**
             * Header indicating the format for API responses.
             */
            Accept: 'application/transit+json';
        };
        /**
         * Base URL for the main API.
         */
        baseUrl: string;
    };
    /**
     * Configuration for the authentication API.
     */
    auth: (config: SdkConfig) => {
        headers: {
            /**
             * Header indicating the content type for authentication requests.
             */
            'Content-Type': 'application/x-www-form-urlencoded';
            /**
             * Header indicating the format for authentication API responses.
             */
            Accept: 'application/json';
        };
        /**
         * Base URL for the authentication API.
         */
        baseUrl: string;
    };
    /**
     * Configuration for the assets API.
     */
    assets: (config: SdkConfig) => {
        headers: {
            /**
             * Header indicating the format for assets API responses.
             */
            Accept: 'application/json';
        };
        /**
         * Base URL for the assets API.
         */
        baseUrl: string;
    };
} : {
    /**
     * Configuration for the authentication API.
     */
    auth: (config: SdkConfig) => {
        headers: {
            /**
             * Header indicating the content type for authentication requests.
             */
            'Content-Type': 'application/x-www-form-urlencoded';
            /**
             * Header indicating the format for authentication API responses.
             */
            Accept: 'application/json';
        };
        /**
         * Base URL for the authentication API.
         */
        baseUrl: string;
    };
    /**
     * Configuration for the integration API.
     */
    integrationApi: (config: SdkConfig) => {
        headers: {
            /**
             * Optional header to enable verbose transit responses.
             */
            'X-Transit-Verbose'?: 'true' | 'false';
            /**
             * Header indicating the format for integration API responses.
             */
            Accept: 'application/transit+json';
        };
        /**
         * Base URL for the integration API.
         */
        baseUrl: string;
    };
};
