"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicant_experiences) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_experiences', applicant_experiences)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
