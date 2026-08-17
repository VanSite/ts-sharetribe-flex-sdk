# Changelog

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
