;(function () {
  "use strict";

  var PositionsController = require('./controllers/positionsController');

  var express = require('express'),
  router = express.Router();

  // positions
  router.get('/positions', PositionsController.Index);
  router.get('/positions/:id', PositionsController.Show);
  router.post('/positions', PositionsController.Create);
  router.put('/positions/:id', PositionsController.Update);

  module.exports = router;
})();
