import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    // dist/index.(js|mjs) — full SDK, path-compatible with the pre-3.2.0 webpack output
    index: "src/index.ts",
    // dist/sdkTypes/index.(js|mjs) — "./types" subpath, zero heavy deps
    "sdkTypes/index": "src/sdkTypes/index.ts",
    // dist/utils/transit.(js|mjs) — "./transit" subpath
    "utils/transit": "src/utils/transit.ts",
  },
  format: ["esm", "cjs"],
  target: "es2020",
  // Shared chunks so "." and the subpaths use the SAME class instances
  // (transit write handlers are keyed by class identity).
  splitting: true,
  // transit-js is CJS without usable named exports under Node ESM — inline it.
  noExternal: ["transit-js"],
  sourcemap: true,
  minify: false,
  // keepNames wraps every declaration in a non-PURE __name() call, which makes
  // consumers' minifiers treat all classes as side-effectful and defeats
  // tree-shaking. Nothing in src/ relies on constructor.name at runtime
  // (transit write handlers are keyed by class identity, not name).
  keepNames: false,
  // Type declarations come from `tsc -p tsconfig.build.json`, UMD from webpack.
  dts: false,
  clean: false, // `npm run clean` handles this; must not wipe UMD/types output
});
