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

## Choosing a Version: 4.x vs 3.2

Both lines expose the **same public API** (endpoints, method signatures, `SharetribeApiError`
error shape) and both ship the tree-shakeable build with the `./types` and `./transit`
subpath exports. The difference is the HTTP layer:

| | **4.x** (recommended) | **3.2.x** |
|---|---|---|
| HTTP layer | Native `fetch` — no axios | axios + axios-retry |
| Runtime dependencies | `js-cookie`, `transit-js`, `uuid` | + `axios`, `axios-retry` |
| Bundle size | ~50 KB (raw) smaller for every consumer | baseline |
| Node.js | **≥ 18 required** (native fetch) | ≥ 14 |
| `httpAgent` / `httpsAgent` config | removed (undici pools connections automatically) | supported |
| `sdk.axios` | deprecated alias for `sdk.httpClient` (axios-compatible surface) | axios instance |

**Pick 4.x** unless you are stuck on Node < 18, pass custom `http(s).Agent`s to the
Integration SDK, or depend on the real axios instance (e.g. axios interceptors/adapters
of your own). In those cases stay on **3.2.x** — it still gets the full bundle-size win
from tree-shaking and the subpath exports.

```bash
npm install @vansite/ts-sharetribe-flex-sdk@^4   # fetch-based (default)
npm install @vansite/ts-sharetribe-flex-sdk@^3.2 # axios-based
```

Typical app code needs **no changes** when upgrading 3.2 → 4.0 — see the
[CHANGELOG](./CHANGELOG.md) for the full breaking-change list.

## Quick Start

```typescript
import { SharetribeSdk, IntegrationSdk, sdkTypes } from "@vansite/ts-sharetribe-flex-sdk";

const { UUID, Money, LatLng } = sdkTypes;

// --- Marketplace (client-side / browser) ---
const sdk = new SharetribeSdk({ clientId: "your-client-id" });

const { data } = await sdk.listings.query({
  keywords: "yoga",
  price: "1000,10000", // range "min,max" in minor units (cents)
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

## Module Formats & Subpath Exports

Published in three formats (resolved automatically via the `exports` field):

| Format | File | Entry |
|--------|------|-------|
| ES Module | `dist/index.mjs` | `import` |
| CommonJS | `dist/index.js` | `require` |
| UMD / Browser | `dist/index.umd.js` | global `TsSharetribeFlexSdk` |

Since 3.2.0 the build is tree-shakeable (`sideEffects: false`) and two lightweight
subpaths let you keep the HTTP client out of bundles that don't need it:

```typescript
// SDK value types only — no HTTP client in your bundle (~5 KB min+gz)
import { UUID, Money, LatLng, LatLngBounds, BigDecimal, reviver }
  from "@vansite/ts-sharetribe-flex-sdk/types";

// Transit serialization only
import { read, write } from "@vansite/ts-sharetribe-flex-sdk/transit";
```

Class identity is shared across entry points: a `UUID` imported from `./types` is the
same class the full SDK uses internally, so `instanceof` checks and custom type
handlers keep working.

## Changelog

### 4.0.0
- **axios replaced with native `fetch`** — axios/axios-retry dropped, ~50 KB (raw) less in every consumer bundle; retries (3×, exponential backoff) built in
- Breaking: Node.js ≥ 18 required; `httpAgent`/`httpsAgent` config removed; `sdk.axios` deprecated in favor of `sdk.httpClient`
- Public API, response shape and `SharetribeApiError` unchanged

### 3.2.0
- Tree-shakeable ESM/CJS builds (tsup with code splitting) and `sideEffects: false`
- New subpath exports `./types` and `./transit`
- ESM build no longer references Node's `http`/`https` — no bundler fallbacks needed

See [CHANGELOG.md](./CHANGELOG.md) for details and older releases.

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

Works with **pnpm**, **yarn** or **npm**:

```bash
pnpm install   # yarn install      | npm install
pnpm build     # yarn build        | npm run build    — bundles (CJS/ESM/UMD) + types
pnpm test      # yarn test         | npm test         — Jest test suite
pnpm analyze   # yarn analyze      | npm run analyze  — bundle size analysis
```

## Contributing

Contributions are welcome! Please use the standard GitHub flow (fork → branch → pull request).
Bug reports, feature requests, expanded test coverage and documentation improvements are all appreciated.

## License

MIT — see [LICENSE](LICENSE.txt).

---

**Tags:** Sharetribe Flex · TypeScript SDK · Marketplace API · Integration API · Node.js · Browser
