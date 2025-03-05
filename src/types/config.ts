import UUID from "../sdkTypes/UUID";
import LatLng from "../sdkTypes/LatLng";
import Money from "../sdkTypes/Money";
import LatLngBounds from "../sdkTypes/LatLngBounds";
import BigDecimal from "../sdkTypes/BigDecimal";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";

/**
 * Supported SDK type classes.
 */
type SdkTypeClass =
  | typeof UUID
  | typeof LatLng
  | typeof Money
  | typeof LatLngBounds
  | typeof BigDecimal;

/**
 * Supported SDK type instances.
 */
type SdkTypeInstance = UUID | LatLng | Money | LatLngBounds | BigDecimal;

/**
 * Represents application-specific types.
 * `AppType` is set to `any` to allow flexibility.
 */
type AppType = any;

/**
 * Interface for handling type transformations between SDK and application-specific types.
 * T represents the specific SDK type instance (e.g., UUID, Money)
 * U represents the specific application type
 */
export interface TypeHandler<
  T extends SdkTypeInstance = SdkTypeInstance,
  U = any
> {
  sdkType: SdkTypeClass;
  appType: AppType;
  /**
   * Function to read and transform a specific SDK type instance into an application-specific type.
   */
  reader?: (value: T) => U;
  /**
   * Function to write and transform an application-specific type into a specific SDK type instance.
   */
  writer?: (value: U) => T;
  /**
   * Function to determine if a handler can process a specific key-value pair.
   */
  canHandle?: (args: { key: string; value: any }) => boolean;
}

/**
 * Interface for storing and managing authentication tokens.
 */
export interface TokenStore {
  token?: {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: "public-read" | "trusted:user" | "user" | "integ";
    refresh_token?: string;
  } | null;
  expiration?: number;

  /**
   * Retrieves the current token.
   * @returns A promise resolving to the token or null if no token is available.
   */
  getToken: () => Promise<{
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: "public-read" | "trusted:user" | "user" | "integ";
    refresh_token?: string;
  } | null>;

  /**
   * Sets a new token.
   * @param args - The token details.
   */
  setToken: (args: {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope?: "public-read" | "trusted:user" | "user" | "integ";
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
  typeHandlers?: TypeHandler<any, any>[];
  /**
   * Http Agent
   */
  httpAgent?: HttpAgent;
  /**
   * Https Agent
   */
  httpsAgent?: HttpsAgent;
}
