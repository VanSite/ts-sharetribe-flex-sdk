const path = require('path');

const fileName = (target) => `ts-sharetribe-flex-sdk.${target}.js`;
const config = {
  mode: 'development', // or 'production'
  entry: './src/index.ts',
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
};

const serverConfig = {
  ...config,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileName('node'),
  },
};

const clientConfig = {
  ...config,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileName('web'),
  },
};

module.exports = [serverConfig, clientConfig];
