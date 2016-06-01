"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicantPortfolio) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_portfolios', applicantPortfolio)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
