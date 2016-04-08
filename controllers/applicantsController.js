"use strict";

var applicantService = require('../services/applicantService');
var applicantUploadService = require('../services/applicantUploadService');
var HttpStatus = require('http-status-codes');
var _ = require('lodash');

module.exports = {

  index: function (request, response) {
    applicantService.list(request.query)
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

    applicantService.show(id)
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
    applicantService.create(applicant)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  },

  upload_files: function (request, response) {
    applicantUploadService.upload_files(request)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data)
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  },

  update_files: function (request, response) {
    var id = request.params.id;
    applicantUploadService.update_files(id,request)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data)
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
    applicantService.update(id, applicant)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
        message: err.message, code: err.code, type: err.type
      }});
    });
  }
};
