"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var ApplicantEducation = require('../models/applicantEducation');
var Validation = new Checkit(require('../validation/applicantEducationValidation'));

module.exports = {
  create: function (applicantID, applicantEducationParams) {
    return Promise.join(
    applicantEducationParams.forEach(function (param) {
      param.id = UUID.v1();
      param.applicant_id = applicantID;
      param.created_at = new Date();

      new Promise(function (resolve, reject) {
        Validation.run(param)
        .then(function () {
          ApplicantEducation.create(param)
          .then(function () {
            resolve();
          })
        })
        .catch(function (err) {
          reject(err);
        })
      });
    })
    );
  }
};

