;
(function () {
  "use strict";

  var express = require('express');
  var app = express();
  var port = 5000;

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.use('/api', require('./routes'));

  app.listen(port);
})();
