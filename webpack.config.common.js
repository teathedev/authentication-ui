var path = require('path');
var webpack = require('webpack');


const mainPath = path.join(__dirname, './src');
const testPath = path.join(__dirname, './test');


module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      src: mainPath,
      test: testPath,
      ui: path.resolve(mainPath, 'ui'),
      apps: path.resolve(mainPath, 'ui/apps'),
      modules: path.resolve(mainPath, 'ui/modules'),
      data: path.resolve(mainPath, 'data')
    }
  },

  module: {
    rules: [
      {
        test: /\.js?/,
        use: 'babel-loader?cacheDirectory=true',
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|authoring\-player)/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.mp3$/,
        use: 'file-loader'
      },
      {
        test: /.*\.(svg)$/i,
        include: path.resolve(mainPath, 'ui/svg/inline'),
        use: "svg-inline-loader"
      },
      {
        test: /.*\.(svg)$/i,
        include: path.resolve(mainPath, 'ui/svg/default'),
        use: {
          loader: "url-loader",
          options: {
            limit: 1000000
          }
        }
      },
      {
        include: path.join(__dirname, 'node_modules/slick-carousel'),
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
      },
      {
        include: path.resolve(mainPath, 'ui/fonts'),
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        use: "file-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: []
};
