;
(function () {
  "use strict";

  var express = require('express');
  var requireDir = require('require-dir')
  var app = express();
  var port = 5000;

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  var routes = requireDir('./routes');
  for (var i in routes) app.use('/api', routes[i]);

  app.listen(port);
})();
