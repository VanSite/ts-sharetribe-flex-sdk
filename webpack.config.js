const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

const isAnalyze = process.env.ANALYZE === "true";

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
  plugins: [],
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
};

const cjsConfig = {
  ...commonConfig,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ts-sharetribe-flex-sdk.cjs",
    library: {
      type: "commonjs2",
    },
    pathinfo: true,
  },
  externals: {
    http: "commonjs http",
    https: "commonjs https",
  },
  plugins: isAnalyze ? [createAnalyzerPlugin("cjs")] : [],
};

const esmConfig = {
  ...commonConfig,
  target: ["web", "es2020"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ts-sharetribe-flex-sdk.mjs",
    library: {
      type: "module",
    },
    pathinfo: true,
    environment: {
      module: true,
    },
  },
  experiments: {
    outputModule: true,
  },
  externalsType: "import",
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
};

module.exports = [cjsConfig, esmConfig, umdConfig];
