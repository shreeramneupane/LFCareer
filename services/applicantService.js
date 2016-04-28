"use strict";

var checkit = require('checkit');
var uuid = require('node-uuid');
var validation = new checkit(require('../validation/applicantValidation'));
var Applicant = require('../models/applicant');
var _ = require('lodash');
var Promise = require("bluebird");
var AppError = require('../error/AppError');
var helpers = require('../helpers/filterHelper');
var ApplicantHelper = require('../helpers/applicantFilter');


module.exports = {
  list: function (params) {

    var parsedUrl = ApplicantHelper.urlParser(params);

    return new Promise(function (resolve, reject) {
      Applicant.list(parsedUrl)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {

    return new Promise(function (resolve, reject) {
      Applicant.show(id)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (applicant) {
    var applicant = _(applicant).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(applicant)
      .then(function () {
        applicant.id = uuid.v1();
        Applicant.create(applicant)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
      });
    });
  },

  update: function (id, applicant) {
    var applicant = _(applicant).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(applicant)
      .then(function () {
        Applicant.update(id, applicant)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
      });
    });
  }

};

