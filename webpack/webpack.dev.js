const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root(helpers.paths.dist),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new DashboardPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
