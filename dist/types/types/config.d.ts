import UUID from '../sdkTypes/UUID';
import LatLng from '../sdkTypes/LatLng';
import Money from '../sdkTypes/Money';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import BigDecimal from "../sdkTypes/BigDecimal";
type SdkType = UUID | LatLng | Money | LatLngBounds | BigDecimal;
type AppType = any;
export interface TypeHandler {
    sdkType: SdkType;
    appType: AppType;
    reader?: (value: SdkType) => AppType;
    writer?: (value: AppType) => SdkType;
    canHandle?: (args: {
        key: string;
        value: any;
    }) => boolean;
}
export interface TokenStore {
    token?: {
        access_token: string;
        token_type: 'bearer';
        expires_in: number;
        scope?: 'public-read' | 'trusted:user' | 'user' | 'integ';
        refresh_token?: string;
    } | null;
    expiration?: number;
    getToken: () => Promise<{
        access_token: string;
        token_type: 'bearer';
        expires_in: number;
        scope?: 'public-read' | 'trusted:user' | 'user' | 'integ';
        refresh_token?: string;
    } | null>;
    setToken: (args: {
        access_token: string;
        token_type: 'bearer';
        expires_in: number;
        scope?: 'public-read' | 'trusted:user' | 'user' | 'integ';
        refresh_token?: string;
    }) => void;
    removeToken: () => void;
}
export interface SdkConfig {
    clientId: string;
    clientSecret?: string;
    baseUrl?: string;
    assetCdnBaseUrl?: string;
    version?: string;
    tokenStore?: TokenStore;
    secure?: boolean;
    transitVerbose?: boolean;
    authToken?: string;
    typeHandlers?: TypeHandler[];
}
export {};
