const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'www');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  // Entry point to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './app.js'),
  ],
  // Webpack config options on how to obtain modules
  resolve: {
    // When requiring, you don't need to add these extensions
    extensions: ['', '.js', '.md', '.txt'],
  },
  // Configuration for dev server
  devServer: {
    contentBase: 'www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    // Required for webpack-dev-server.
    outputPath: buildPath,
  },
  devtool: 'eval',
  // Output file config
  output: {
    path: buildPath, // Path of output file
    filename: 'bundle.js', // Name of output file
  },
  plugins: [
    // Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: 'www/index.html'},
    ]),
  ],
  externals: {
    fs: 'js', // To remove once https://github.com/benjamn/recast/pull/238 is released
  },
  module: {
    // Allow loading of non-es
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  // eslint: {
  //   configFile: '../.eslintrc',
  // },
};

module.exports = config;
