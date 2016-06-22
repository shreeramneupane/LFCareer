"use strict";

var HttpStatus = require('http-status-codes');

var ApplicantStageService = require('../services/applicantStageService');

module.exports = {

  index: function (request, response) {
    var applicantID = request.params.applicant_id;
    ApplicantStageService.list(applicantID)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({
        error: {
          message: err.message, code: err.code, type: err.type
        }
      });
    });
  },

  listStage: function (request, response) {
    var applicantID = request.params.applicant_id;
    var query = request.query;
    ApplicantStageService.listStage(applicantID, query)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({
        error: {
          message: err.message, code: err.code, type: err.type
        }
      });
    });
  }
};
