"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var ApplicantExperience = require('../models/applicantExperience');
var Validation = new Checkit(require('../validation/applicantExperienceValidation'));

module.exports = {
  create: function (applicantID, applicantExperienceParams) {
    return Promise.join(
    applicantExperienceParams.forEach(function (param) {
      param.id = UUID.v1();
      param.applicant_id = applicantID;
      param.created_at = new Date();
      
      new Promise(function (resolve, reject) {
        Validation.run(param)
        .then(function () {
          ApplicantExperience.create(param)
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

