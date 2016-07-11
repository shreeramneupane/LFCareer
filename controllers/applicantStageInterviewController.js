"use strict";

var HttpStatus = require('http-status-codes');

var ApplicantStageInterviewService = require('../services/applicantStageInterviewService');

module.exports = {

  update: function (request, response) {
    var applicantStageInterviewID = request.params.id;
    var applicantStageInterviewParam = request.body;
    ApplicantStageInterviewService.update(applicantStageInterviewID, applicantStageInterviewParam)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({
        error: {
          message: err.message, code: err.code, type: err.type
        }
      })
    })
  },

  interviewResponse: function (request, response) {
    var applicantStageInterviewID = request.params.id;
    ApplicantStageInterviewService.interviewerResponse(applicantStageInterviewID)
    .then(function (interviewResponse) {
      response.status(HttpStatus.OK).json(interviewResponse);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({
        error: {
          message: err.message, code: err.code, type: err.type
        }
      })
    })
  }
};
