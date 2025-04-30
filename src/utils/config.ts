import MemoryStore from "./stores/MemoryStore";
import { TypeHandler } from "../types/config";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";

type DefaultSdkConfigType = {
  baseUrl: string;
  assetCdnBaseUrl?: string;
  version: string;
  transitVerbose: boolean;
  tokenStore?: MemoryStore;
  typeHandlers?: TypeHandler[];
  httpAgent?: HttpAgent;
  httpsAgent?: HttpsAgent;
};

type DefaultIntegrationSdkConfigType = {
  baseUrl: string;
  version: string;
  transitVerbose: boolean;
  tokenStore?: MemoryStore;
  httpAgent?: HttpAgent;
  httpsAgent?: HttpsAgent;
  typeHandlers?: TypeHandler[];
};

const isNode = typeof window === "undefined";

/**
 * Default SDK configuration object for the Sharetribe Flex API.
 */
export const DefaultSdkConfig: DefaultSdkConfigType = {
  assetCdnBaseUrl: "https://cdn.st-api.com", // Base URL for assets
  baseUrl: "https://flex-api.sharetribe.com", // Base URL for the API
  tokenStore: new MemoryStore(), // Default token store (in-memory)
  transitVerbose: false, // Toggle for verbose transit serialization
  typeHandlers: [], // Array to handle custom data types
  version: "v1", // API version
};

/**
 * Default SDK configuration object for the Sharetribe Flex Integration API.
 */
export const DefaultIntegrationSdkConfig: DefaultIntegrationSdkConfigType = {
  baseUrl: "https://flex-integ-api.sharetribe.com",
  ...(isNode && {
    httpAgent: new HttpAgent({ keepAlive: true, maxSockets: 10 }), // Default HTTP agent
    httpsAgent: new HttpsAgent({ keepAlive: true, maxSockets: 10 }), // Default HTTPS agent
  }),
  tokenStore: new MemoryStore(), // Default token store (in-memory)
  transitVerbose: false, // Toggle for verbose transit serialization
  typeHandlers: [], // Array to handle custom data types
  version: "v1", // API version
};
