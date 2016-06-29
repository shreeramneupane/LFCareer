"use strict";

var HttpStatus = require('http-status-codes');

var ApplicantStageRemarkService = require('../services/applicantStageRemarkService');

module.exports = {

  create: function (request, response) {
    var applicantStageID = request.params.applicant_stage_id;
    var remark = request.body.remark;
    ApplicantStageRemarkService.add(applicantStageID, remark)
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
  }
};
