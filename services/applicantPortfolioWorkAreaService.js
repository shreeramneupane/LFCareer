"use strict";

var Checkit = require('checkit');
var Promise = require("bluebird");
var _ = require('lodash');

var ApplicantPortfolioWorkArea = require('../models/applicantPortfolioWorkArea');
var Validation = new Checkit(require('../validation/applicantPortfolioWorkAreaValidation'));
var WorkAreaService = require('../services/workAreaService');

module.exports = {
  create: function (applicantPortFolioID, applicantPortfolioWorkAreaParams) {
    return Promise.join(
    applicantPortfolioWorkAreaParams.forEach(function (workArea) {
      var param = {
        applicant_portfolio_id: applicantPortFolioID,
        created_at: new Date(),
      };

      new Promise(function (resolve, reject) {
        WorkAreaService.getId(workArea)
        .then(function (response) {
          param.work_area_id = response;
          Validation.run(param)
          .then(function () {
            ApplicantPortfolioWorkArea.create(param)
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

