"use strict";

var checkit = require('checkit');
var uuid = require('node-uuid');
var Promise = require("bluebird");
var _ = require('lodash');

var Applicant = require('../models/applicant');
var validation = new checkit(require('../validation/applicantValidation'));

var ApplicantAchievementService = require('../services/applicantAchievementService');
var ApplicantEducationService = require('../services/applicantEducationService');
var ApplicantExperienceService = require('../services/applicantExperienceService');
var ApplicantReferenceService = require('../services/applicantReferenceService');
var ApplicantPortfolioService = require('../services/applicantPortfolioService');

var AppError = require('../error/AppError');

var ApplicantService = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Applicant.list()
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

  create: function (applicantParams) {
    var applicant = _.pick(applicantParams, ['name', 'email', 'address', 'linkedin', 'phone_number', 'cover_letter', 'hobbies', 'source', 'notification']);
    return new Promise(function (resolve, reject) {
      validation.run(applicant)
      .then(function () {
        applicant.id = uuid.v1();
        applicant.created_at = new Date();
        Applicant.create(applicant)
        .then(function () {
          ApplicantService.createNestedRecords(applicant.id, applicantParams)
          .then(function () {
            resolve();
          })
        })
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
      })
    });
  },

  update: function (id, applicant) {
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
  },

  createNestedRecords: function (applicantID, applicantParams) {
    return Promise.join(
    ApplicantAchievementService.create(applicantID, applicantParams['achievements']),
    ApplicantEducationService.create(applicantID, applicantParams['educations']),
    ApplicantExperienceService.create(applicantID, applicantParams['experiences']),
    ApplicantReferenceService.create(applicantID, applicantParams['references']),
    ApplicantPortfolioService.create(applicantID, applicantParams['portfolios']))
  }
};

module.exports = ApplicantService;
