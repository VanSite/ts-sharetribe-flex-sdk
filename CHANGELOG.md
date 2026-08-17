# Changelog

## 4.0.0 (2026-08-17)

### axios is gone — native fetch under the hood 🚀

The SDK's HTTP layer now runs on native `fetch` (Node.js ≥ 18, all modern browsers,
React Native). **axios and axios-retry are no longer dependencies**, which removes
~50 KB (raw) from every consumer bundle on top of the 3.2.0 tree-shaking wins — with
zero changes required in typical application code.

#### What stays the same

- The entire public API: all endpoints, method signatures, and the
  `{ data, status, statusText, headers }` response shape.
- Error handling: failed requests still reject with a `SharetribeApiError`
  (`name`, `status`, `statusText`, `data` with the parsed API error body).
- Automatic retries: 3 attempts with exponential backoff for network errors and
  idempotent 5xx responses (the axios-retry defaults), now built into the client.
  Retries happen below the interceptors, so the transit-body double-serialization
  class of bugs (fixed in 3.1.2) is now structurally impossible.
- Token management: transparent 401/403 refresh, token stores, transit
  serialization — all unchanged (86 tests, all green).

#### Breaking changes

- **Node.js ≥ 18 required** (native `fetch`). `"engines"` is set accordingly.
- **`httpAgent` / `httpsAgent` SDK config options removed** — fetch does not use
  `http.Agent`. Node's undici pools and keep-alives connections automatically, so
  the Integration SDK keeps its connection reuse without configuration.
- **`sdk.axios` is deprecated** (but still works): it now returns the SDK's own
  fetch-based client, which mirrors the axios surface the SDK used (callable,
  `get`/`post`, `interceptors`, `defaults`). Migrate to `sdk.httpClient`.
- TypeScript: `AxiosInstance`/`AxiosResponse` types in signatures are replaced by
  the SDK's own `HttpClient`/`HttpResponse` (exported from the package root).
  If you only consume `const { data } = await sdk...`, nothing changes.

#### For library/tool authors

- New exports: `HttpError`, `createHttpClient`, and the `HttpClient`,
  `HttpResponse`, `HttpRequestConfig` types.
- The client's transport is swappable via `sdk.httpClient.defaults.adapter` —
  handy for testing without network access.

## 3.2.0 (2026-08-17)

### Tree-shakeable builds & lightweight subpath exports 🌳

This release is all about bundle size. If you only need the SDK's value types or the
Transit serializer in your client bundle, you no longer have to pay for the whole SDK
(HTTP client included).

#### New subpath exports

```js
// SDK value types only — no axios, no transit-js in your bundle (~5 KB min+gz)
import { UUID, Money, LatLng, LatLngBounds, BigDecimal, reviver, replacer, toSdkTypes }
  from "@vansite/ts-sharetribe-flex-sdk/types";

// Transit serialization only — no HTTP client in your bundle
import { read, write, createTransitConverters }
  from "@vansite/ts-sharetribe-flex-sdk/transit";
```

Typical use case (e.g. Sharetribe Web Template–style apps): your `util/api.js` and the
40+ files importing `sdkTypes` can switch to these subpaths, keeping axios and the full
SDK client out of pages that never talk to the Marketplace API directly.

#### Modular, tree-shakeable build

- The CJS and ESM builds are now produced by tsup/esbuild with code splitting instead of
  a single monolithic webpack bundle. Bundlers can finally tree-shake the SDK.
- `"sideEffects": false` is set in `package.json`.
- The main entry (`.`), `./types` and `./transit` share internal chunks, so class
  identity is guaranteed: a `UUID` from `./types` is the same class the SDK uses
  internally — `instanceof` checks and custom type handlers keep working across entry
  points.
- The ESM build no longer references Node's `http`/`https` modules, so browser bundlers
  need no fallbacks/polyfills for them.

#### Compatibility

- **No breaking changes.** The main entry (`.`) exports exactly the same API from the
  same file paths (`dist/index.js`, `dist/index.mjs`, `dist/index.umd.js`).
- The UMD browser bundle (`TsSharetribeFlexSdk` global) is unchanged.
- Node.js CJS keeps the default keep-alive `http(s).Agent` behavior for the Integration
  SDK; ESM/browser builds behave as before.

#### Expected impact

For a typical marketplace client bundle that imports the full SDK plus `sdkTypes`:
switching type/transit imports to the new subpaths removes transit-js (~120 KB raw) from
the main bundle immediately; tree-shaking trims the rest. The upcoming 4.0.0 will drop
axios in favor of native `fetch` for another ~50 KB.

## 3.1.2 (2026-08-15)

- fix: keep the raw (pre-transit) request body across axios-retry retries — retried
  POSTs are no longer double-serialized.

## 3.1.1

- docs: fixed price filter example, listed yarn/npm dev commands.
