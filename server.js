var express = require('express')
var app     = express()
var url     = require('url');

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
