;(function () {
  "use strict";

  var utilityService = require('../services/utilityService');
  var applicantUploadService = require('../services/applicantUploadService');
  var HttpStatus = require('http-status-codes');
  var Applicant = require('../models/applicant_upload');

  module.exports = {

    upload: function (request, response) {
      var applicant = request.body;

      applicantService.validate(applicant)
      .then(function () {
        utilityService.addUUID(applicant);
        Applicant.create(applicant)
        .then(function (data) {
          response.status(HttpStatus.OK).json(applicant)
        })
        .catch(function (err) {
          err = "Can not create new applicant with provided parameters.";
          response.status(HttpStatus.BAD_REQUEST).json({error: err});
        });
      })
      .catch(function (err) {
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    }
  };
})();
