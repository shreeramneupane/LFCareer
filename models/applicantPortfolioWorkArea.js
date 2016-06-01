"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicantPortfolioWorkArea) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_portfolios_work_areas', applicantPortfolioWorkArea)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
