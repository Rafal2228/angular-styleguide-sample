var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'vendor': './src/vendor.js',
    'app': './src/index.js'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: "jshint-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'ng-annotate-loader'
        },{
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!stylus-loader?paths=node_modules/bootstrap-styl&resolve url',
        }),
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
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
        jshint: {
          // any jshint option http://www.jshint.com/docs/options/
          // i. e.
          camelcase: true,

          // jshint errors are displayed by default as warnings
          // set emitErrors to true to display them as errors
          emitErrors: true,

          // jshint to not interrupt the compilation
          // if you want any file with jshint errors to fail
          // set failOnHint to true
          failOnHint: true,
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
      name: ['app', 'vendor']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
