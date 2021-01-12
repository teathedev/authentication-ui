var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require('./webpack.config.dev');


var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: 'errors-only',
  publicPath: config.output.publicPath
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(3060, function(err) {
  server.keepAliveTimeout = 0;

  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3060');
});
