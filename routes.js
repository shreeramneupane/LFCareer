;(function () {
  "use strict";

  var PositionsController = require('./controllers/positionsController');

  var express = require('express'),
  router = express.Router();

  // positions
  router.get('/positions', PositionsController.Index);
  router.post('/positions', PositionsController.Create);

  module.exports = router;
})();
