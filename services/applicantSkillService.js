"use strict";

var Checkit = require('checkit');
var Promise = require("bluebird");
var _ = require('lodash');

var ApplicantSkill = require('../models/applicantSkill');
var Validation = new Checkit(require('../validation/applicantSkillValidation'));
var SkillService = require('../services/skillService');

module.exports = {
  create: function (applicantID, applicantSkillParams) {
    return Promise.join(
    applicantSkillParams.forEach(function (skill) {
      var param = {
        applicant_id: applicantID,
        created_at: new Date(),
      };

      new Promise(function (resolve, reject) {
        SkillService.getId(skill)
        .then(function (response) {
          param.skill_id = response;

          Validation.run(param)
          .then(function () {
            ApplicantSkill.create(param)
            .then(function () {
              resolve();
            })
          })
          .catch(function (err) {
            reject(err);
          })
        });
      });
    })
    );
  }
};

