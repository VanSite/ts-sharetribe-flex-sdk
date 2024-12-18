const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Use an environment variable to check if we should analyze
const isAnalyze = process.env.ANALYZE === 'true';

const commonConfig = {
  mode: 'production',
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
  optimization: {
    minimize: true,
  },
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
};

module.exports = [cjsConfig, esmConfig, umdConfig];
