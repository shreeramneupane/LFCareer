;(function () {
  "use strict";

  var express = require('express');
  var app = express();

  require('./db');

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.use(require('./routes'));

  var port = 5000;

  app.listen(port);
})();
