"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicant_educations) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_educations', applicant_educations)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
