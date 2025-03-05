import MemoryStore from "./stores/MemoryStore";
import { TypeHandler } from "../types/config";
type DefaultSdkConfigType = {
    baseUrl: string;
    assetCdnBaseUrl: string;
    version: string;
    transitVerbose: boolean;
    tokenStore: MemoryStore;
    typeHandlers: TypeHandler[];
};
/**
 * Default SDK configuration object for the Sharetribe Flex API.
 */
export declare const DefaultSdkConfig: DefaultSdkConfigType;
export {};
//# sourceMappingURL=config.d.ts.map