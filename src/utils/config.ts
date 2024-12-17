import MemoryStore from "./stores/memory-store";

export const DefaultSdkConfig = {
  baseUrl: 'https://flex-api.sharetribe.com',
  assetCdnBaseUrl: 'https://cdn.st-api.com',
  version: 'v1',
  transitVerbose: false,
  tokenStore: new MemoryStore(),
  typeHandlers: []
}