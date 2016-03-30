;
(function () {
  "use strict";

  var applicantsController = require('../controllers/applicantsController');

  var express = require('express'),
  router = express.Router();

  // Applicant
  router.post('/applicant', applicantsController.Create);

  module.exports = router;
})();
