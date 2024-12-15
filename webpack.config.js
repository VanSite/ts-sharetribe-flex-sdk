const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Use an environment variable to check if we should analyze
const isAnalyze = process.env.ANALYZE === 'true';

const commonConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  ],
};

const cjsConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ts-sharetribe-flex-sdk.cjs.js',
    library: {
      type: 'commonjs2',
    },
  },
  optimization: {
    minimize: false, // No minification for CommonJS
  },
};

const esmConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ts-sharetribe-flex-sdk.mjs',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: false, // No minification for ES modules
  },
};

const umdConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ts-sharetribe-flex-sdk.js',
    library: {
      name: 'TsSharetribeFlexSdk',
      type: 'umd',
      export: 'named',
    },
    globalObject: 'this',
  },
  optimization: {
    minimize: true, // Minification for the UMD bundle
  },
};

module.exports = [cjsConfig, esmConfig, umdConfig];
