;
(function () {
  "use strict";

  var applicantsController = require('../controllers/applicantsController');

  var express = require('express'),
  router = express.Router();

  // Applicant
  router.get('/applicants', applicantsController.Index);
  router.post('/applicant', applicantsController.Create);

  module.exports = router;
})();
