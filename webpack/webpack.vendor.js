const webpack = require('webpack');
const helpers = require('./helpers');
const package = require(helpers.root('package.json'));

const plugins = [
  new webpack.DllPlugin({
    path: helpers.root(helpers.paths.dist, 'vendor-manifest.json'),
    name: '[name]_lib'
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.unshift(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      keep_fnames: true,
    },
    sourceMap: true
  }));
}

module.exports = {
  entry: {
    'vendor': Object.keys(package.dependencies)
  },

  devtool: '#source-map',

  output: {
    filename: '[name].js',
    path: helpers.root(helpers.paths.dist),
    library: '[name]_lib'
  },

  plugins
};
