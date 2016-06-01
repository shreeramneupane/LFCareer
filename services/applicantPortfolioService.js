"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");
var _ = require('lodash');

var ApplicantPortfolio = require('../models/applicantPortfolio');
var ApplicantPortfolioWorkAreaService = require('./applicantPortfolioWorkAreaService');
var Validation = new Checkit(require('../validation/applicantPortfolioValidation'));

module.exports = {
  create: function (applicantID, applicantPortfolioParams) {
    return Promise.join(
    applicantPortfolioParams.forEach(function (param) {

      new Promise(function (resolve, reject) {
        Validation.run(param)
        .then(function () {
          let applicantPortfolio = _.pick(param, ['project_name', 'description', 'link']);
          applicantPortfolio.id = UUID.v1();
          applicantPortfolio.applicant_id = applicantID;
          applicantPortfolio.created_at = new Date();

          ApplicantPortfolio.create(applicantPortfolio)
          .then(function () {
            ApplicantPortfolioWorkAreaService.create(applicantPortfolio.id, param.work_areas)
            .then(function () {
              resolve();
            });
          });
        })
        .catch(function (err) {
          reject(err);
        })
      });
    })
    );
  }
};

