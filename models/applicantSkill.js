"use strict";

var Repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {
  create: function (applicantSkill) {
    return new Promise(function (resolve, reject) {
      Repository.create('applicants_skills', applicantSkill)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
