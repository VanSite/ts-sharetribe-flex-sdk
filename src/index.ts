/**
 * A collection of utilities, SDKs, and types provided by the Sharetribe SDK.
 *
 * @module SharetribeSdkExports
 */

import SharetribeSdkExport from "./sdk";
import IntegrationSdkExport from "./integrationSdk";
import BigDecimal from "./sdkTypes/BigDecimal";
import UUID from "./sdkTypes/UUID";
import LatLng from "./sdkTypes/LatLng";
import LatLngBounds from "./sdkTypes/LatLngBounds";
import Money from "./sdkTypes/Money";
import {replacer, reviver} from "./utils/convert-types";
import MemoryStore from "./utils/stores/MemoryStore";
import BrowserStore from "./utils/stores/BrowserStore";
import ExpressStore from "./utils/stores/ExpressStore";
import {objectQueryString} from "./utils/util";
import {read, write} from "./utils/transit";

// Export marketplace types
export * from "./types/assets";
export * from "./types/authentication";
export * from "./types/integration/events";
export * from "./types/marketplace/availabilityExceptions";
export * from "./types/marketplace/availabilityPlan";
export * from "./types/marketplace/bookings";
export * from "./types/marketplace/currentUser";
export * from "./types/marketplace/images";
export * from "./types/marketplace/listings";
export * from "./types/marketplace/marketplace";
export * from "./types/marketplace/messages";
export * from "./types/marketplace/ownListings";
export * from "./types/marketplace/passwordReset";
export * from "./types/marketplace/processTransitions";
export * from "./types/marketplace/reviews";
export * from "./types/marketplace/stock";
export * from "./types/marketplace/stockAdjustment";
export * from "./types/marketplace/stockReservations";
export * from "./types/marketplace/stripeAccount";
export * from "./types/marketplace/stripeAccountLinks";
export * from "./types/marketplace/stripeCustomer";
export * from "./types/marketplace/stripePaymentMethod";
export * from "./types/marketplace/stripePersons";
export * from "./types/marketplace/stripeSetupIntents";
export * from "./types/marketplace/timeSlots";
export * from "./types/marketplace/transactions";
export * from "./types/marketplace/user";
export * from "./types/config";
export * from "./types/sharetribe";
export * from "./types/apiConfigs";
export * from "./types/config";
export * from "./types/store";

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
  /** Replacer function for JSON serialization. */
  replacer,
  /** Reviver function for JSON deserialization. */
  reviver,
};

export type SdkTypes = {
  BigDecimal: typeof BigDecimal;
  LatLng: typeof LatLng;
  LatLngBounds: typeof LatLngBounds;
  Money: typeof Money;
  UUID: typeof UUID;
  replacer: typeof replacer;
  reviver: typeof reviver;
};

export type TokenStores = {
  MemoryStore: typeof MemoryStore;
  BrowserStore: typeof BrowserStore;
  ExpressStore: typeof ExpressStore;
};

/**
 * Token store implementations for managing authentication tokens.
 */
export const TokenStores: TokenStores = {
  /** In-memory token store for temporary token management. */
  MemoryStore,
  /** Browser token store using cookies. */
  BrowserStore,
  /** Express.js-compatible token store using request and response cookies. */
  ExpressStore,
};

export type Transit = {
  read: typeof read;
  write: typeof write;
};

/**
 * Transit utilities for reading and writing transit data.
 */
export const transit: Transit = {
  read,
  write,
};

/**
 * Export the Sharetribe SDK and Integration SDK.
 */
export const SharetribeSdk = SharetribeSdkExport;
export type SharetribeSdk = SharetribeSdkExport;

export const IntegrationSdk = IntegrationSdkExport;
export type IntegrationSdk = IntegrationSdkExport;

/**
 * Utility functions for data manipulation.
 */
export const util = {
  /** Serializes an object into a custom query string format. */
  objectQueryString,
};
export type Util = {
  objectQueryString: typeof objectQueryString;
};

const defaultExport = {
  /** Export of the Sharetribe SDK. */
  SharetribeSdk: SharetribeSdkExport,
  /** Export of the Integration SDK. */
  SharetribeIntegrationSdk: IntegrationSdkExport,
  /** Export of available token stores. */
  TokenStores,
  /** Export of SDK-specific types. */
  sdkTypes,
  /** Export of utility functions. */
  util,
  /** Export of Transit utilities. */
  transit,
};
export default defaultExport;

export type DefaultExport = {
  SharetribeSdk: SharetribeSdkExport;
  SharetribeIntegrationSdk: IntegrationSdkExport;
  TokenStores: typeof TokenStores;
  sdkTypes: typeof sdkTypes;
  util: typeof util;
  transit: typeof transit;
};
