const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'app': helpers.root(helpers.paths.src, 'index.ts')
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        enforce: "pre",
        exclude: /(node_modules|bower_components)/,
        use: "tslint-loader"
      },
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'ng-annotate-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          exportAsEs6Default: true,
          root: helpers.root('src'),
          attrs: ['img:src', 'link:href']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: `file-loader?name=${helpers.paths.assets}/[name].[hash].[ext]`
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.css$/,
        exclude: helpers.root(helpers.paths.src, 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.css$/,
        include: helpers.root(helpers.paths.src, 'app'),
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          configFile: helpers.root('tslint.json'),
          tsConfigFile: helpers.root('tsconfig.json')
        }
      }
    }),

    new webpack.DllReferencePlugin({
      manifest: require(helpers.root(helpers.paths.dist, 'vendor-manifest.json')),
      context: '.'
    }),

    new HtmlWebpackPlugin({
      template: helpers.root(helpers.paths.src, 'index.html')
    }),

    new AddAssetHtmlPlugin({
      filepath: require.resolve(helpers.root(helpers.paths.dist, 'vendor.js'))
    })
  ]
};
