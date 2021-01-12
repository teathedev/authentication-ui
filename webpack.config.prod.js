var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var commonConfig = require('./webpack.config.common');


const srcPath = path.join(__dirname, './src');


module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: commonConfig.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_URL': JSON.stringify(
          process.env.API_URL || '//localhost:4010/api'
        )
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: 'index_prod.html', to: '../index.html' }
    ]),
    new CopyWebpackPlugin([
      { from: 'server.js', to: '../server.js' }
    ])
  ]),

  resolve: commonConfig.resolve,

  module: {
    rules: commonConfig.module.rules.concat({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=LU_[path]_[name]_[local]_[hash:base64:5]!postcss-loader',
        'less-loader'
      ]
    })
  }
};
