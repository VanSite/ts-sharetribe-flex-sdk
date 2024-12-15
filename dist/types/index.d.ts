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
export declare const sdkTypes: {
    BigDecimal: typeof BigDecimal;
    LatLng: typeof LatLng;
    LatLngBounds: typeof LatLngBounds;
    Money: typeof Money;
    UUID: typeof UUID;
};
export declare const TokenStore: {
    MemoryStore: typeof MemoryStore;
    BrowserStore: typeof BrowserStore;
    ExpressStore: typeof ExpressStore;
};
export declare const util: {
    objectQueryString: (obj: Record<string, any>) => string;
    createTypeHandler: (handler: import("./types/config").TypeHandler) => {
        sdkType: BigDecimal | LatLng | LatLngBounds | Money | UUID | Date;
        appType?: any;
        reader?: ((args_0: BigDecimal | LatLng | LatLngBounds | Money | UUID | Date, ...args: unknown[]) => any) | undefined;
        writer?: ((args_0: any, ...args: unknown[]) => BigDecimal | LatLng | LatLngBounds | Money | UUID | Date) | undefined;
        canHandle?: ((args_0: {
            key: string;
            value?: any;
        }, ...args: unknown[]) => boolean) | undefined;
    };
};
export declare const SharetribeSdk: typeof sharetribeSdk;
export declare const IntegrationSdk: typeof integrationSdk;
declare const _default: {
    SharetribeSdk: typeof sharetribeSdk;
    IntegrationSdk: typeof integrationSdk;
    TokenStore: {
        MemoryStore: typeof MemoryStore;
        BrowserStore: typeof BrowserStore;
        ExpressStore: typeof ExpressStore;
    };
    sdkTypes: {
        BigDecimal: typeof BigDecimal;
        LatLng: typeof LatLng;
        LatLngBounds: typeof LatLngBounds;
        Money: typeof Money;
        UUID: typeof UUID;
    };
    util: {
        objectQueryString: (obj: Record<string, any>) => string;
        createTypeHandler: (handler: import("./types/config").TypeHandler) => {
            sdkType: BigDecimal | LatLng | LatLngBounds | Money | UUID | Date;
            appType?: any;
            reader?: ((args_0: BigDecimal | LatLng | LatLngBounds | Money | UUID | Date, ...args: unknown[]) => any) | undefined;
            writer?: ((args_0: any, ...args: unknown[]) => BigDecimal | LatLng | LatLngBounds | Money | UUID | Date) | undefined;
            canHandle?: ((args_0: {
                key: string;
                value?: any;
            }, ...args: unknown[]) => boolean) | undefined;
        };
    };
};
export default _default;
