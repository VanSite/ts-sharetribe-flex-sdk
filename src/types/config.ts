import UUID from '../sdkTypes/UUID';
import LatLng from '../sdkTypes/LatLng';
import Money from '../sdkTypes/Money';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import BigDecimal from "../sdkTypes/BigDecimal";
import MemoryStore from "../utils/stores/memory-store";

type SdkType = UUID | LatLng | Money | LatLngBounds | BigDecimal;

// Similarly, appTypeSchema was z.any(), so we just use `any`.
type AppType = any;

// Previously, typeHandlerSchema was a Zod schema defining TypeHandler shape.
export interface TypeHandler {
  sdkType: SdkType;
  appType: AppType;
  reader?: (value: SdkType) => AppType;
  writer?: (value: AppType) => SdkType;
  canHandle?: (args: { key: string; value: any }) => boolean;
}

// The tokenStore and other configurations were also defined via Zod. We now define them as interfaces.
// Note: Without Zod, we don't enforce defaults or refinements automatically.
// For example, "baseUrl should not finish with a '/'." must be checked at runtime if needed.

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

// Similarly, for sdkConfig:
export interface SdkConfig {
  clientId: string; // must be non-empty (runtime check needed)
  clientSecret?: string;
  baseUrl?: string;          // runtime check: should not end with '/'
  assetCdnBaseUrl?: string;  // runtime check: should not end with '/'
  version?: string;
  tokenStore?: TokenStore;
  secure?: boolean;
  transitVerbose?: boolean;
  authToken?: string;
  typeHandlers?: TypeHandler[];
}
