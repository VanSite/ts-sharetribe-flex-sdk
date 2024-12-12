const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const fileName = (name, target) => `ts-sharetribe-flex-${name}.${target}.js`;

// Use an environment variable to check if we should analyze
const isAnalyze = process.env.ANALYZE === 'true';

const baseConfig = (name, target) => ({
  mode: 'development', // or 'production'
  entry: './src/sdk.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileName(name, target),
  },
});

const sdkServerConfig = {
  ...baseConfig('sdk', 'node'),
  target: 'node',
};

const sdkClientConfig = {
  ...baseConfig('sdk', 'web'),
  target: 'web',
};

const integrationSdkServerConfig = {
  ...baseConfig('integration-sdk', 'node'),
  target: 'node',
};

module.exports = [
  sdkServerConfig,
  sdkClientConfig,
  integrationSdkServerConfig
];
