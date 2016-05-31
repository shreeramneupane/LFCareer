"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicant_achievements) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_achievements', applicant_achievements)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
