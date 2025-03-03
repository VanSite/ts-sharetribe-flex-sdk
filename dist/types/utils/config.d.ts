import MemoryStore from "./stores/memory-store";
/**
 * Default SDK configuration object for the Sharetribe Flex API.
 */
export declare const DefaultSdkConfig: {
    baseUrl: string;
    assetCdnBaseUrl: string;
    version: string;
    transitVerbose: boolean;
    tokenStore: MemoryStore;
    typeHandlers: never[];
};
