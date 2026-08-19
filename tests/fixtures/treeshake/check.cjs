// Asserts that the integration-API branch was tree-shaken out of the fixture
// bundle. Markers are string literals that survive minification.
const fs = require("fs");
const path = require("path");

const bundlePath = path.resolve(__dirname, "out", "bundle.js");
const src = fs.readFileSync(bundlePath, "utf8");
const kb = (fs.statSync(bundlePath).size / 1024).toFixed(1);

// Sanity check: the marketplace branch the fixture actually uses must be there.
const CONTROL = "flex-api.sharetribe.com";
// Integration-only literal (IntegrationSdk base URL) — must NOT be there.
const FORBIDDEN = "flex-integ-api.sharetribe.com";

if (!src.includes(CONTROL)) {
  console.error(`FAIL: control marker "${CONTROL}" missing — fixture broken`);
  process.exit(2);
}
if (src.includes(FORBIDDEN)) {
  console.error(
    `FAIL: integration marker "${FORBIDDEN}" found in bundle (${kb} KB) — tree-shaking not working`
  );
  process.exit(1);
}
console.log(`PASS: integration branch tree-shaken. Bundle size: ${kb} KB`);
