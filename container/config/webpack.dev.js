const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
// handle dependencies without adding the common modules in the shared property of webpack plugin : line 23
const packageJSON = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // shared: ['react','react-dom'],
      shared: packageJSON.dependencies, // shared: ['react', 'react-dom'], webpack will take the list from the object with key value , Key as the package and value as a version
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

// merge will merge the config from commonConfig with devConfig , the second argument overrides the first
module.exports = merge(commonConfig, devConfig);
