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
import MemoryStore from "./utils/stores/MemoryStore";
import BrowserStore from "./utils/stores/BrowserStore";
import ExpressStore from "./utils/stores/ExpressStore";
export * from "./types/assets";
export * from "./types/authentication";
export * from "./types/integration/events";
export * from "./types/marketplace/availabilityExceptions";
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
 * Transit utilities for reading and writing transit data.
 */
export declare const transit: {
    read: (str: string, opts?: import("./utils/transit").TransitOptions) => any;
    write: (data: any, opts?: import("./utils/transit").TransitOptions) => string;
};
/**
 * Export the Sharetribe SDK and Integration SDK.
 */
export declare const SharetribeSdk: typeof SharetribeSdkExport;
export declare const IntegrationSdk: typeof IntegrationSdkExport;
/**
 * Utility functions for data manipulation.
 */
export declare const util: {
    /** Serializes an object into a custom query string format. */
    objectQueryString: (obj: {
        [x: string]: any;
    }) => string;
};
declare const _default: {
    /** Export of the Sharetribe SDK. */
    SharetribeSdk: typeof SharetribeSdkExport;
    /** Export of the Integration SDK. */
    IntegrationSdk: typeof IntegrationSdkExport;
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
    };
    /** Export of Transit utilities. */
    transit: {
        read: (str: string, opts?: import("./utils/transit").TransitOptions) => any;
        write: (data: any, opts?: import("./utils/transit").TransitOptions) => string;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map