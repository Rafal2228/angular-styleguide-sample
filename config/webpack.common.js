const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'app': './src/index.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        enforce: "pre",
        exclude: /(node_modules|bower_components)/, // exclude any and all files in the node_modules folder
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
        use: 'file-loader?name=assets/[name].[hash].[ext]'
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
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
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
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('src/index.html')
    })
  ]
};
