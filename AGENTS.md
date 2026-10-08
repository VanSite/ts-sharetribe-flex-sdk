# AGENTS.md

Guidance for Codex (Codex.ai/code) when working in this repository.

## Project Overview

TypeScript SDK for the Sharetribe Marketplace API and Integration API in a single package: full type
safety, cross-platform (Node.js and browser), built-in token management.

## Common Commands

```bash
npm run build          # Build bundles AND type declarations
npm run build:bundles  # JS bundles only
npm run build:types    # TypeScript declarations only
npm test               # Run all Jest tests
npm test -- path/to/test.ts  # Run single test file
npm run analyze        # Analyze bundle size
npm run clean          # Remove build output
```

Package manager is **pnpm**. Publishing goes to npmjs **and** GitHub Packages.

## Architecture

### Two Main SDK Classes

1. **SharetribeSdk** (`src/sdk.ts`) — client-side/Marketplace API. OAuth2 user tokens. `new SharetribeSdk({ clientId })`
2. **IntegrationSdk** (`src/integrationSdk.ts`) — server-side/Integration API. Client credentials. `new IntegrationSdk({ clientId, clientSecret })`

### Key Directories

- `src/endpoints/marketplace/` — 17 Marketplace API endpoint classes
- `src/endpoints/integrationApi/` — 10 Integration API endpoint classes
- `src/endpoints/auth/` — authentication endpoints
- `src/sdkTypes/` — SDK value types (UUID, Money, BigDecimal, LatLng, LatLngBounds); zero runtime deps besides `uuid`
- `src/types/` — TypeScript type definitions for all API resources
- `src/utils/stores/` — token stores (MemoryStore, BrowserStore, ExpressStore)

### Data Flow

SDK method → endpoint class → shared HTTP layer (`src/utils/prepare-axios-instance.ts`).
Request interceptor injects the auth token and serializes SDK types to Transit; response interceptor
parses Transit back to SDK types and refreshes tokens on 401/403.

### Transit Format

`transit-js` serializes complex types (`application/transit+json`). Custom handlers live in
`src/utils/transit.ts`. Keep `src/utils/transit.ts` and `src/utils/convert-types.ts` free of imports
from the HTTP layer — they are exposed as the standalone `./transit` subpath export.

## Build & Package Layout

- `./` — full SDK; `./types` — SDK value types only; `./transit` — Transit read/write only.
  The subpaths must stay dependency-light (no axios, no HTTP layer) so consumers can keep them in
  their main bundle without dragging in the whole SDK.
- `"sideEffects": false` is set — no module-level side effects allowed in `src/`.

## Testing

Jest + ts-jest, tests in `tests/` mirroring source structure, 10 s timeout, `axios-mock-adapter` for
HTTP mocking.
