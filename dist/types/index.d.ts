/**
 * A collection of utilities, SDKs, and types provided by the Sharetribe SDK.
 *
 * @module SharetribeSdkExports
 */
import sharetribeSdk from './sdk';
import integrationSdk from './integrationSdk';
import BigDecimal from "./sdkTypes/BigDecimal";
import UUID from "./sdkTypes/UUID";
import LatLng from "./sdkTypes/LatLng";
import LatLngBounds from "./sdkTypes/LatLngBounds";
import Money from "./sdkTypes/Money";
import MemoryStore from "./utils/stores/memory-store";
import BrowserStore from "./utils/stores/browser-store";
import ExpressStore from "./utils/stores/express-store";
/**
 * SDK-specific types provided for advanced usage.
 */
export declare const sdkTypes: {
    /** A representation of a high-precision decimal number. */
    BigDecimal: typeof BigDecimal;
    /** A geographical point with latitude and longitude. */
    LatLng: typeof LatLng;
    /** A bounding box defined by northeast and southwest geographical points. */
    LatLngBounds: typeof LatLngBounds;
    /** A monetary value with an amount and currency. */
    Money: typeof Money;
    /** A universally unique identifier (UUID). */
    UUID: typeof UUID;
};
/**
 * Token store implementations for managing authentication tokens.
 */
export declare const TokenStore: {
    /** In-memory token store for temporary token management. */
    MemoryStore: typeof MemoryStore;
    /** Browser token store using cookies. */
    BrowserStore: typeof BrowserStore;
    /** Express.js-compatible token store using request and response cookies. */
    ExpressStore: typeof ExpressStore;
};
/**
 * Utility functions for data manipulation.
 */
export declare const util: {
    /** Serializes an object into a custom query string format. */
    objectQueryString: (obj: {
        [x: string]: any;
    }) => string;
    /** Converts a value based on _sdkType property to a SDK type. */
    transitToJson: (transitString: string) => any;
};
/**
 * The main Sharetribe SDK for interacting with the Sharetribe API.
 */
export declare const SharetribeSdk: typeof sharetribeSdk;
/**
 * The Integration SDK for interacting with the Sharetribe Integration API.
 */
export declare const IntegrationSdk: typeof integrationSdk;
declare const _default: {
    /** Export of the Sharetribe SDK. */
    SharetribeSdk: typeof sharetribeSdk;
    /** Export of the Integration SDK. */
    IntegrationSdk: typeof integrationSdk;
    /** Export of available token stores. */
    TokenStore: {
        /** In-memory token store for temporary token management. */
        MemoryStore: typeof MemoryStore;
        /** Browser token store using cookies. */
        BrowserStore: typeof BrowserStore;
        /** Express.js-compatible token store using request and response cookies. */
        ExpressStore: typeof ExpressStore;
    };
    /** Export of SDK-specific types. */
    sdkTypes: {
        /** A representation of a high-precision decimal number. */
        BigDecimal: typeof BigDecimal;
        /** A geographical point with latitude and longitude. */
        LatLng: typeof LatLng;
        /** A bounding box defined by northeast and southwest geographical points. */
        LatLngBounds: typeof LatLngBounds;
        /** A monetary value with an amount and currency. */
        Money: typeof Money;
        /** A universally unique identifier (UUID). */
        UUID: typeof UUID;
    };
    /** Export of utility functions. */
    util: {
        /** Serializes an object into a custom query string format. */
        objectQueryString: (obj: {
            [x: string]: any;
        }) => string;
        /** Converts a value based on _sdkType property to a SDK type. */
        transitToJson: (transitString: string) => any;
    };
};
export default _default;
