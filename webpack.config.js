// Webpack only builds the UMD browser bundle. CJS/ESM come from tsup
// (see tsup.config.ts), type declarations from `tsc -p tsconfig.build.json`.
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

const isAnalyze = process.env.ANALYZE === "true";

const umdConfig = {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      http: false,
      https: false,
      url: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    concatenateModules: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.umd.js",
    library: {
      name: "TsSharetribeFlexSdk",
      type: "umd",
      export: "default",
    },
    pathinfo: true,
    globalObject: "this",
  },
  plugins: isAnalyze
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "bundle-analysis-umd.html",
          openAnalyzer: false,
        }),
      ]
    : [],
};

module.exports = [umdConfig];
