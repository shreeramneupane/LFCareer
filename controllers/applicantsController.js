"use strict";

var HttpStatus = require('http-status-codes');

var ApplicantService = require('../services/applicantService');
var ApplicantDocumentService = require('../services/applicantDocumentService');

module.exports = {

  index: function (request, response) {
    var result = ApplicantService.list(request.query);
    result
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  },

  show: function (request, response) {
    var id = request.params.id;

    ApplicantService.show(id)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  },

  create: function (request, response) {
    var applicant = request.body;
    ApplicantService.create(applicant)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  },

  update: function (request, response) {
    var id = request.params.id;
    var applicant = request.body;
    ApplicantService.update(id, applicant)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  },

  create_document: function (request, response) {
    var applicantID = request.params.applicant_id;
    var documents = request.files;
    ApplicantDocumentService.create(applicantID, documents)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data)
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  }
};
