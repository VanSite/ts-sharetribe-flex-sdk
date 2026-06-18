# @vansite/ts-sharetribe-flex-sdk

[![npm version](https://img.shields.io/npm/v/@vansite/ts-sharetribe-flex-sdk)](https://www.npmjs.com/package/@vansite/ts-sharetribe-flex-sdk)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MIT License](https://img.shields.io/badge/license-MIT-green)

A fully-typed **TypeScript SDK** for the [Sharetribe Flex API](https://www.sharetribe.com/api-reference/). It wraps both the **Marketplace API** and the **Integration API** in a single, lightweight package — with built-in token management, Transit serialization, and the same code path for Node.js and the browser.

## Features

- **Two SDKs, one package** — `SharetribeSdk` (client/marketplace) and `IntegrationSdk` (server/backend)
- **Cross-platform** — identical code in Node.js and the browser, no loader needed
- **Fully typed** — complete definitions generated from the official Sharetribe reference, including per-endpoint request params and `include`-aware response shapes
- **Complete API coverage** — Marketplace, Integration, Authentication and Asset Delivery APIs, incl. the file-sharing endpoints
- **Built-in token management** — pluggable token stores (memory, browser cookie, Express)
- **Transit-aware** — transparent serialization of `UUID`, `Money`, `LatLng`, `BigDecimal`, …
- **Tree-shakeable** — ships ESM, CJS and a UMD browser bundle

## Installation

```bash
npm install @vansite/ts-sharetribe-flex-sdk
# or: pnpm add … / yarn add …
```

## Quick Start

```typescript
import { SharetribeSdk, IntegrationSdk, sdkTypes } from "@vansite/ts-sharetribe-flex-sdk";

const { UUID, Money, LatLng } = sdkTypes;

// --- Marketplace (client-side / browser) ---
const sdk = new SharetribeSdk({ clientId: "your-client-id" });

const { data } = await sdk.listings.query({
  keywords: "yoga",
  price: { gte: 1000, lte: 10000 }, // minor units (cents)
  include: ["author", "images"],
});

// --- Integration (server-side only) ---
const integrationSdk = new IntegrationSdk({
  clientId: "your-client-id",
  clientSecret: "your-client-secret", // never expose in the browser
});

await integrationSdk.users.show({ id: new UUID("user-id") });
```

> **Money is in minor units** (e.g. cents). Always wrap typed values in `sdkTypes`
> (`UUID`, `Money`, `LatLng`, `LatLngBounds`, `BigDecimal`) so they serialize correctly.

## API Coverage & Documentation

Both APIs are covered end-to-end. See the per-area guides in [`docs/`](./docs):

| Guide | Contents |
|-------|----------|
| [Getting Started](./docs/getting-started.md) | Setup, configuration, first requests |
| [Marketplace API](./docs/marketplace-api.md) | Listings, users, transactions, messages, reviews, **file sharing**, Stripe, … |
| [Integration API](./docs/integration-api.md) | Privileged listing/user/transaction ops, events, **files & attachments**, stock |
| [Authentication](./docs/authentication.md) | Token grants, login/logout, IdP, token exchange |
| [Token Stores](./docs/token-stores.md) | `MemoryStore`, `BrowserStore`, `ExpressStore` |
| [Transit Serialization](./docs/transit-serialization.md) | How SDK types map to Transit |
| [SDK Types](./docs/sdk-types.md) | `UUID`, `Money`, `LatLng`, `LatLngBounds`, `BigDecimal` |
| [Examples](./docs/examples.md) | End-to-end recipes |

**Asset Delivery API** is exposed directly on the SDK: `sdk.assetByAlias`,
`sdk.assetsByAlias`, `sdk.assetByVersion`, `sdk.assetsByVersion`.

## Token Management

Tokens are persisted through a pluggable store (a `MemoryStore` is used by default):

```typescript
import { SharetribeSdk, TokenStores } from "@vansite/ts-sharetribe-flex-sdk";

// Express: store the refresh token in a secure, httpOnly cookie
const sdk = new SharetribeSdk({
  clientId: "your-client-id",
  tokenStore: new TokenStores.ExpressStore({ clientId: "your-client-id", req, res, secure: true, httpOnly: true }),
});
```

| Store | Use case |
|-------|----------|
| `MemoryStore` | Default; scripts, tests, short-lived processes |
| `BrowserStore` | Single-page apps (browser cookies) |
| `ExpressStore` | Server apps; pair with `httpOnly: true` in production |

## Module Formats

Published in three formats (resolved automatically via the `exports` field):

| Format | File | Entry |
|--------|------|-------|
| ES Module | `dist/index.mjs` | `import` |
| CommonJS | `dist/index.js` | `require` |
| UMD / Browser | `dist/index.umd.js` | global `TsSharetribeFlexSdk` |

## Migration from `sharetribe-flex-sdk`

<details>
<summary>SDK loader, Transit and token stores</summary>

### SDK Loader

The SDK loader is no longer needed — there is no difference between the Node and web builds.

```javascript
// before
import { types as sdkTypes } from "./sdkLoader";
// after
import { sdkTypes } from "@vansite/ts-sharetribe-flex-sdk";
const { Money } = sdkTypes;
```

### Transit

```javascript
// before: import { transit } from "./sdkLoader";
// after:
import { transit } from "@vansite/ts-sharetribe-flex-sdk";

const serialize = (data) => transit.write(data, { typeHandlers, verbose: config.sdk.transitVerbose });
const deserialize = (str) => transit.read(str, { typeHandlers });
```

### Token Stores

```javascript
// before
const store = require("sharetribe-flex-sdk").tokenStore.memoryStore();
// after
const { TokenStores } = require("@vansite/ts-sharetribe-flex-sdk");
const store = new TokenStores.MemoryStore();
```

</details>

## Development

This repo uses **pnpm**.

```bash
pnpm install
pnpm build      # bundles (CJS/ESM/UMD) + type declarations
pnpm test       # Jest test suite
pnpm analyze    # bundle size analysis
```

## Contributing

Contributions are welcome! Please use the standard GitHub flow (fork → branch → pull request).
Bug reports, feature requests, expanded test coverage and documentation improvements are all appreciated.

## License

MIT — see [LICENSE](LICENSE.txt).

---

**Tags:** Sharetribe Flex · TypeScript SDK · Marketplace API · Integration API · Node.js · Browser
