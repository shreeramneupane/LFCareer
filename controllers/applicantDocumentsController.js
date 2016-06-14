
"use strict";

var HttpStatus = require('http-status-codes');

var ApplicantDocumentService = require('../services/applicantDocumentService');

module.exports = {

  create: function (request, response) {
    var applicantID = request.params.applicant_id;
    var documents = request.files;
    ApplicantDocumentService.create(applicantID, documents)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data)
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({
        error: {
          message: err.message, code: err.code, type: err.type
        }
      });
    });
  },

  show: function (request, response) {
    var applicantID = request.params.applicant_id;
    var documentType = request.query.type;
    ApplicantDocumentService.show(applicantID, documentType)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data)
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
