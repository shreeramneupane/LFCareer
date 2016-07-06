var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor'   : './app/vendor.ts',
    'app'      : './main.ts'
  },

  resolve: {
    alias     : {
      config: helpers.root('config', process.env.NODE_ENV)
    },
    extensions: ['', '.js', '.ts']
  },

  module: {
    preLoaders: [
      {
        test   : /\.js$/,
        loader : 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
        ]
      }
    ],

    loaders: [
      {
        test  : /\.ts$/,
        loader: 'ts'
      },
      {
        test   : /\.html$/,
        loader : 'raw-loader',
        exclude: [helpers.root('app/index.html')]
      },

      {
        test  : /.(png|woff(2)?|eot|ttf|gif|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test   : /\.css$/,
        include: helpers.root('app'),
        exclude: helpers.root('app', 'shared', 'assets'),
        loader : 'raw?sourceMap'
      },
      {
        test   : /\.css$/,
        include: helpers.root('app', 'shared', 'assets'),
        loader : ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test   : /\.css$/,
        exclude: helpers.root('app'),
        loader : ExtractTextPlugin.extract('style', 'css?sourceMap')
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      inject  : true,
      template: './index.html'
    })
  ]
}
;