import MemoryStore from "./stores/memory-store";

/**
 * Default SDK configuration object for the Sharetribe Flex API.
 */
export const DefaultSdkConfig = {
  baseUrl: 'https://flex-api.sharetribe.com', // Base URL for the API
  assetCdnBaseUrl: 'https://cdn.st-api.com', // Base URL for assets
  version: 'v1', // API version
  transitVerbose: false, // Toggle for verbose transit serialization
  tokenStore: new MemoryStore(), // Default token store (in-memory)
  typeHandlers: [] // Array to handle custom data types
};
