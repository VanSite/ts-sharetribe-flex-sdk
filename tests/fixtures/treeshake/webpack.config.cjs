const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "entry.js"),
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "bundle.js",
    clean: true,
  },
  resolve: {
    alias: {
      // Link against the locally built ESM output, like a webpack-5 consumer
      // resolving the "import" condition of the exports map.
      "@vansite/ts-sharetribe-flex-sdk": path.resolve(
        __dirname,
        "../../../dist/index.mjs"
      ),
    },
  },
  performance: { hints: false },
};
