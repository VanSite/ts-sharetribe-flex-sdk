const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

// Use an environment variable to check if we should analyze
const isAnalyze = process.env.ANALYZE === "true";

// Create a function to generate analyzer plugins with different names
const createAnalyzerPlugin = (name) => {
  return new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: `bundle-analysis-${name}.html`,
    openAnalyzer: false,
  });
};

const commonConfig = {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js"],
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
  plugins: [],
  optimization: {
    minimize: false,
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
};

const cjsConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ts-sharetribe-flex-sdk.cjs",
    library: {
      type: "commonjs2",
    },
    pathinfo: true,
  },
  plugins: isAnalyze ? [createAnalyzerPlugin("cjs")] : [],
};

const esmConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ts-sharetribe-flex-sdk.mjs",
    library: {
      type: "module",
    },
    pathinfo: true,
  },
  experiments: {
    outputModule: true,
  },
  plugins: isAnalyze ? [createAnalyzerPlugin("esm")] : [],
};

const umdConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ts-sharetribe-flex-sdk.js",
    library: {
      name: "TsSharetribeFlexSdk",
      type: "umd",
      export: "default",
    },
    pathinfo: true,
    globalObject: "this",
  },
  plugins: isAnalyze ? [createAnalyzerPlugin("umd")] : [],
};

module.exports = [cjsConfig, esmConfig, umdConfig];
