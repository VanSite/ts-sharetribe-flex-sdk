import UUID from '../sdkTypes/UUID';
import LatLng from '../sdkTypes/LatLng';
import Money from '../sdkTypes/Money';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import BigDecimal from "../sdkTypes/BigDecimal";
/**
 * Supported SDK types.
 */
type SdkType = UUID | LatLng | Money | LatLngBounds | BigDecimal;
/**
 * Represents application-specific types.
 * `AppType` is set to `any` to allow flexibility.
 */
type AppType = any;
/**
 * Interface for handling type transformations between SDK and application-specific types.
 */
export interface TypeHandler {
    sdkType: SdkType;
    appType: AppType;
    /**
     * Function to read and transform an SDK type into an application-specific type.
     */
    reader?: (value: SdkType) => AppType;
    /**
     * Function to write and transform an application-specific type into an SDK type.
     */
    writer?: (value: AppType) => SdkType;
    /**
     * Function to determine if a handler can process a specific key-value pair.
     */
    canHandle?: (args: {
        key: string;
        value: any;
    }) => boolean;
}
/**
 * Interface for storing and managing authentication tokens.
 */
export interface TokenStore {
    token?: {
        access_token: string;
        token_type: 'bearer';
        expires_in: number;
        scope?: 'public-read' | 'trusted:user' | 'user' | 'integ';
        refresh_token?: string;
    } | null;
    expiration?: number;
    /**
     * Retrieves the current token.
     * @returns A promise resolving to the token or null if no token is available.
     */
    getToken: () => Promise<{
        access_token: string;
        token_type: 'bearer';
        expires_in: number;
        scope?: 'public-read' | 'trusted:user' | 'user' | 'integ';
        refresh_token?: string;
    } | null>;
    /**
     * Sets a new token.
     * @param args - The token details.
     */
    setToken: (args: {
        access_token: string;
        token_type: 'bearer';
        expires_in: number;
        scope?: 'public-read' | 'trusted:user' | 'user' | 'integ';
        refresh_token?: string;
    }) => void;
    /**
     * Removes the current token.
     */
    removeToken: () => void;
}
/**
 * Interface for SDK configuration settings.
 */
export interface SdkConfig {
    /**
     * The client ID. Must be non-empty (enforced at runtime).
     */
    clientId: string;
    /**
     * The client secret (optional).
     */
    clientSecret?: string;
    /**
     * Base URL for the SDK. Should not end with '/' (enforced at runtime).
     */
    baseUrl?: string;
    /**
     * Base URL for asset CDN. Should not end with '/' (enforced at runtime).
     */
    assetCdnBaseUrl?: string;
    /**
     * SDK version (optional).
     */
    version?: string;
    /**
     * Token store for managing authentication tokens.
     */
    tokenStore?: TokenStore;
    /**
     * Whether to use secure connections.
     */
    secure?: boolean;
    /**
     * Whether to enable verbose mode for Transit serialization.
     */
    transitVerbose?: boolean;
    /**
     * Predefined authentication token.
     */
    authToken?: string;
    /**
     * Custom type handlers for transforming data.
     */
    typeHandlers?: TypeHandler[];
}
export {};
