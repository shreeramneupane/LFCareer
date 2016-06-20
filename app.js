"use strict";

var express = require('express'),
app = express(),
port = 5000,

requireDir = require('require-dir'),
bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  require('./helpers/authorization').authorize(req, res, next);
});
var routes = requireDir('./routes');
for (var i in routes) app.use('/v1', routes[i]);

app.listen(port);
