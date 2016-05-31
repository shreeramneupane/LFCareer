"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicant_references) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_references', applicant_references)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
