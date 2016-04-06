"use strict";

var utilityService = require('../services/utilityService');
var applicantService = require('../services/applicantService');
var applicantUploadService = require('../services/applicantUploadService');
var HttpStatus = require('http-status-codes');
var Applicant = require('../models/applicant');

var _ = require('lodash');

module.exports = {

  index: function (request, response) {
    //Handling the promise here
    Applicant.index()
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      err = 'Cannot fetch applicants';
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },

  show: function (request, response) {
    var id = request.params.id;

    Applicant.show(id)
    .then(function (data) {
      if (typeof data === 'undefined') {
        throw new Error();
      }
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      err = 'Can not fetch applicant with id: ' + id;
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },
  create: function (request, response) {
    applicantService.create(request)
    .then(function (upload_files) {
      response.status(HttpStatus.OK).json(upload_files)
    })
    .catch(function (err) {
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },
  upload_files: function (request, response) {
    applicantUploadService.upload_files(request)
    .then(function (upload_files) {
      response.status(HttpStatus.OK).json(upload_files)
    })
    .catch(function (err) {
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },
  update: function (request, response) {
    var id = request.params.id;
    var applicant = request.body;

    applicant = _(applicant).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

    applicantService.validate(applicant)
    .then(function () {
      Applicant.update(id, applicant)
      .then(function (data) {
        Applicant.show(data[0])
        .then(function (updatedApplicant) {
          response.status(HttpStatus.OK).json(updatedApplicant)
        })
      })
      .catch(function (err) {
        err = "Can not update applicant with provided parameters.";
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    })
    .catch(function (err) {
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  }
};
