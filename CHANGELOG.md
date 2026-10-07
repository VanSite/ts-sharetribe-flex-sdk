# Changelog

## 4.2.1 (2026-10-08)

### `currentUser.delete` sends the current password again

`currentUser.delete()` took no arguments and always POSTed an empty body, so
the Marketplace API rejected every self-service account deletion with
`400 validation-invalid-params` ("(not (map? nil))"). It now has the same
signature as `changePassword`/`changeEmail`:

```ts
await sdk.currentUser.delete({ currentPassword }, { expand: true });
```

`CurrentUserDeleteParameter` is now `{ currentPassword: string }` instead of
`void`. Calls without arguments no longer type-check — they could never
succeed against the API.

## 4.2.0 (2026-08-19)

### Tree-shaking works now — Integration API branch dropped from client bundles 🌳

Despite `sideEffects: false` and a proper ESM build, webpack 5 consumers got the
**entire** SDK in their bundle — including the full `endpoints/integrationApi/*` tree
that client code never uses. Three blockers were fixed:

1. **`keepNames: true` in tsup** wrapped every declaration in a non-PURE `__name()`
   helper call, so consumers' minifiers treated all classes as side-effectful.
   Nothing in the SDK relies on `constructor.name` at runtime (transit write
   handlers are keyed by class identity), so keepNames is now off.
2. **`instanceof IntegrationSdk` in the shared HTTP layer** made the whole
   Integration API tree reachable from every `SharetribeSdk` instance. Both SDK
   classes now carry a readonly `_sdkType` discriminator (`"marketplace"` /
   `"integration"`) and the HTTP layer imports the classes type-only.
3. **Top-level `new MemoryStore()`** in the default configs is now
   `/* @__PURE__ */`-annotated.

Measured with a webpack 5 production fixture that imports only
`{ SharetribeSdk, TokenStores }` against `dist/index.mjs`:
**54.7 KB → 40.6 KB minified (−26 %)**; `IntegrationSdk`, all
`endpoints/integrationApi/*` classes and the integration default config are gone
from the output. The fixture is a permanent regression guard:
`pnpm run test:treeshake` (in `tests/fixtures/treeshake/`).

No API changes; the new `_sdkType` field is public but internal. CJS/Node and UMD
consumers are unaffected.

### transit-js loads lazily — main bundle drops another ~120 KB 🪶

The SDK now loads transit-js via dynamic `import()` on the **first API call** instead
of statically at module load. An eagerly constructed `new SharetribeSdk()` in your
app bootstrap no longer pulls transit-js (~120 KB raw) into the main bundle — your
bundler splits it into a separate chunk that is fetched once, right before the first
request is serialized. No app code changes needed for this.

- Works in ESM (`import()` chunk), CJS (lazy `require` at call time) and the UMD
  browser bundle (transit stays inlined there — single-file constraint).
- Combined with 4.0.0 (axios removal) and 3.2.0 (tree-shaking), the main-bundle
  cost of an eagerly constructed SDK is now just the SDK's own code plus `js-cookie`
  and `uuid`.

#### Removed

- The static root exports `transit` / `Transit` (`import { transit } from "@vansite/ts-sharetribe-flex-sdk"`)
  are gone — keeping them would have forced the static transit-js import back into
  the main entry. Use the dedicated subpath instead (available since 3.2.0):

  ```js
  import { read, write } from "@vansite/ts-sharetribe-flex-sdk/transit";
  ```

  Everything else, including `sdkTypes` and `replacer`/`reviver`, is unchanged.

## 4.0.1 (2026-08-17)

- docs: README — version guide (4.x vs 3.2.x), subpath-export examples, updated changelog section.

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
