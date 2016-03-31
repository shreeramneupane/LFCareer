;
(function () {
  "use strict";

  var applicantsController = require('../controllers/applicantsController');

  var express = require('express'),
  router = express.Router();

  // Applicant
  router.get('/applicants', applicantsController.Index);
  router.post('/applicants', applicantsController.create);
  router.post('/applicants/resume', applicantsController.upload_resume);

  module.exports = router;
})();
