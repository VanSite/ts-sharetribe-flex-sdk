import MemoryStore from "./stores/MemoryStore";
import {TypeHandler} from "../types";
import type {Agent as HttpAgent} from "http";
import type {Agent as HttpsAgent} from "https";

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

// Create safe agent creators that work in both ESM and CommonJS environments.
// No static `import from "http"` here — that would break browser bundlers.
// A guarded require keeps the pre-3.2.0 behavior: agents in Node/CJS,
// no agents in ESM/browser builds.
let httpAgentCreator: (options: any) => any = () => undefined;
let httpsAgentCreator: (options: any) => any = () => undefined;

if (isNode) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const http = require("http");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const https = require("https");
    httpAgentCreator = (options: any) => new http.Agent(options);
    httpsAgentCreator = (options: any) => new https.Agent(options);
  } catch {
    // require() is unavailable (ESM bundle) — keep the no-op creators.
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
    httpAgent: httpAgentCreator({keepAlive: true, maxSockets: 10}), // Default HTTP agent
    httpsAgent: httpsAgentCreator({keepAlive: true, maxSockets: 10}), // Default HTTPS agent
  }),
  tokenStore: new MemoryStore(), // Default token store (in-memory)
  transitVerbose: false, // Toggle for verbose transit serialization
  typeHandlers: [], // Array to handle custom data types
  version: "v1", // API version
};
