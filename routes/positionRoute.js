;
(function () {
  "use strict";

  var PositionsController = require('./controllers/postionsController');

  var express = require('express'),
  router = express.Router();

  // Position
  router.post('/positions', PositionsController.Create);

  module.exports = router;
})();
