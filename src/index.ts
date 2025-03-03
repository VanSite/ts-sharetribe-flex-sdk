/**
 * A collection of utilities, SDKs, and types provided by the Sharetribe SDK.
 *
 * @module SharetribeSdkExports
 */

import sharetribeSdk from "./sdk";
import integrationSdk from "./integrationSdk";
import BigDecimal from "./sdkTypes/BigDecimal";
import UUID from "./sdkTypes/UUID";
import LatLng from "./sdkTypes/LatLng";
import LatLngBounds from "./sdkTypes/LatLngBounds";
import Money from "./sdkTypes/Money";
import MemoryStore from "./utils/stores/memory-store";
import BrowserStore from "./utils/stores/browser-store";
import ExpressStore from "./utils/stores/express-store";
import { objectQueryString, transitToJson } from "./utils/util";

/**
 * SDK-specific types provided for advanced usage.
 */
export const sdkTypes = {
  /** A representation of a high-precision decimal number. */
  BigDecimal,
  /** A geographical point with latitude and longitude. */
  LatLng,
  /** A bounding box defined by northeast and southwest geographical points. */
  LatLngBounds,
  /** A monetary value with an amount and currency. */
  Money,
  /** A universally unique identifier (UUID). */
  UUID,
};

/**
 * Token store implementations for managing authentication tokens.
 */
export const TokenStore = {
  /** In-memory token store for temporary token management. */
  MemoryStore,
  /** Browser token store using cookies. */
  BrowserStore,
  /** Express.js-compatible token store using request and response cookies. */
  ExpressStore,
};

/**
 * Utility functions for data manipulation.
 */
export const util = {
  /** Serializes an object into a custom query string format. */
  objectQueryString,
  /** Converts a value based on _sdkType property to a SDK type. */
  transitToJson,
};

/**
 * The main Sharetribe SDK for interacting with the Sharetribe API.
 */
export const SharetribeSdk = sharetribeSdk;

/**
 * The Integration SDK for interacting with the Sharetribe Integration API.
 */
export const IntegrationSdk = integrationSdk;

export default {
  /** Export of the Sharetribe SDK. */
  SharetribeSdk: sharetribeSdk,
  /** Export of the Integration SDK. */
  IntegrationSdk: integrationSdk,
  /** Export of available token stores. */
  TokenStore,
  /** Export of SDK-specific types. */
  sdkTypes,
  /** Export of utility functions. */
  util,
};
