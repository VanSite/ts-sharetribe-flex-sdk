import MemoryStore from "./stores/MemoryStore";
import { TypeHandler } from "../types";
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
const hasAgents =
  typeof HttpAgent === "function" && typeof HttpsAgent === "function";

// Create safe agent creators that work in both ESM and CommonJS environments
let httpAgentCreator: (options: any) => any = () => undefined;
let httpsAgentCreator: (options: any) => any = () => undefined;

// Only initialize agents if we're in a Node.js environment and the modules are available
if (isNode && hasAgents) {
  try {
    httpAgentCreator = (options: any) => new HttpAgent(options);
    httpsAgentCreator = (options: any) => new HttpsAgent(options);
  } catch (e) {
    console.warn("Failed to initialize HTTP/HTTPS agents:", e);
  }
}

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
    httpAgent: httpAgentCreator({ keepAlive: true, maxSockets: 10 }), // Default HTTP agent
    httpsAgent: httpsAgentCreator({ keepAlive: true, maxSockets: 10 }), // Default HTTPS agent
  }),
  tokenStore: new MemoryStore(), // Default token store (in-memory)
  transitVerbose: false, // Toggle for verbose transit serialization
  typeHandlers: [], // Array to handle custom data types
  version: "v1", // API version
};
