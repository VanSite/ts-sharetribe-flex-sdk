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

/**
 * Default SDK configuration object for the Sharetribe Flex API.
 */
export const DefaultSdkConfig: DefaultSdkConfigType = {
  baseUrl: "https://flex-api.sharetribe.com", // Base URL for the API
  assetCdnBaseUrl: "https://cdn.st-api.com", // Base URL for assets
  version: "v1", // API version
  transitVerbose: false, // Toggle for verbose transit serialization
  tokenStore: new MemoryStore(), // Default token store (in-memory)
  typeHandlers: [], // Array to handle custom data types
};

export const DefaultIntegrationSdkConfig: DefaultSdkConfigType = {
  baseUrl: "https://flex-integ-api.sharetribe.com",
  version: "v1",
  transitVerbose: false,
  httpAgent: new HttpAgent({ keepAlive: true, maxSockets: 10 }),
  httpsAgent: new HttpsAgent({ keepAlive: true, maxSockets: 10 }),
  typeHandlers: [],
};
