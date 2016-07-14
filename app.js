"use strict";

var express = require('express'),
app = express(),
port = 5000,

requireDir = require('require-dir'),
bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') {
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
    res.writeHead(200, headers);
    res.end();
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'http://local.vyaguta.lftechnology.com:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // require('./helpers/authorization').authorize(req, res, next);
    next();
  }
});
var routes = requireDir('./routes');
for (var i in routes) app.use('/v1', routes[i]);

app.listen(port);
