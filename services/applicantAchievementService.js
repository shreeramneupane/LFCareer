"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var ApplicantAchievement = require('../models/applicantAchievement');
var Validation = new Checkit(require('../validation/applicantAchievementValidation'));

module.exports = {
  create: function (applicantID, applicantAchievementParams) {
    return Promise.join(
    applicantAchievementParams.forEach(function (param) {
      param.id = UUID.v1();
      param.applicant_id = applicantID;
      param.created_at = new Date();
      
      new Promise(function (resolve, reject) {
        Validation.run(param)
        .then(function () {
          ApplicantAchievement.create(param)
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

