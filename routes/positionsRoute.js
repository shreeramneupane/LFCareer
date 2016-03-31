;(function () {
  "use strict";

  var PositionsController = require('../controllers/positionsController');

  var express = require('express'),
  router = express.Router();

  router.get('/positions', PositionsController.index);
  router.get('/positions/:id', PositionsController.show);
  router.post('/positions', PositionsController.create);
  router.put('/positions/:id', PositionsController.update);

  module.exports = router;
})();
