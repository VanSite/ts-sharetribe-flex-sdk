// Client-side usage profile of the marketplace app: ONLY these two imports.
import { SharetribeSdk, TokenStores } from "@vansite/ts-sharetribe-flex-sdk";

const sdk = new SharetribeSdk({
  clientId: "00000000-0000-0000-0000-000000000000",
  tokenStore: new TokenStores.MemoryStore(),
});

console.log(sdk);
