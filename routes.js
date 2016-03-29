;
(function () {
  "use strict";

  var applicantsController = require('./controllers/applicantsController');
  var PositionsController = require('./controllers/postionsController');

  var express = require('express'),
  router = express.Router();

  // Position
  router.post('/positions', PositionsController.Create);

  // Applicant
  router.get('/applicants', applicantsController.Index);
  router.post('/applicant', applicantsController.Create);

  module.exports = router;
})();
