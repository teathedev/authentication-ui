var path = require('path');
var express = require('express');


var app = express();
const port = process.env.PORT || 3060

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function() {
  console.log(`API Server listening on http://localhost:${port}`); // eslint-disable-line
});
