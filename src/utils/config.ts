import MemoryStore from "./stores/MemoryStore";
import {TypeHandler} from "../types";

type DefaultSdkConfigType = {
  baseUrl: string;
  assetCdnBaseUrl?: string;
  version: string;
  transitVerbose: boolean;
  tokenStore?: MemoryStore;
  typeHandlers?: TypeHandler[];
};

type DefaultIntegrationSdkConfigType = {
  baseUrl: string;
  version: string;
  transitVerbose: boolean;
  tokenStore?: MemoryStore;
  typeHandlers?: TypeHandler[];
};

/**
 * Default SDK configuration object for the Sharetribe Flex API.
 */
export const DefaultSdkConfig: DefaultSdkConfigType = {
  assetCdnBaseUrl: "https://cdn.st-api.com", // Base URL for assets
  baseUrl: "https://flex-api.sharetribe.com", // Base URL for the API
  // PURE keeps this module free of top-level side effects so bundlers can
  // tree-shake the config (and everything it pulls in) when unused.
  tokenStore: /* @__PURE__ */ new MemoryStore(), // Default token store (in-memory)
  transitVerbose: false, // Toggle for verbose transit serialization
  typeHandlers: [], // Array to handle custom data types
  version: "v1", // API version
};

/**
 * Default SDK configuration object for the Sharetribe Flex Integration API.
 *
 * Note: since 4.0.0 the SDK uses native fetch; connection keep-alive is
 * handled by the platform (undici in Node.js), so no http(s).Agent setup
 * is needed here anymore.
 */
export const DefaultIntegrationSdkConfig: DefaultIntegrationSdkConfigType = {
  baseUrl: "https://flex-integ-api.sharetribe.com",
  tokenStore: /* @__PURE__ */ new MemoryStore(), // Default token store (in-memory)
  transitVerbose: false, // Toggle for verbose transit serialization
  typeHandlers: [], // Array to handle custom data types
  version: "v1", // API version
};
