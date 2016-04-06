"use strict";

var checkit = require('checkit');
var validation = new checkit(require('../validation/applicantValidation'))
var Applicant = require('../models/applicant');

module.exports = {

  create: function (request) {

    var params = request.body;

    return new Promise(function (resolve, reject) {
      validation.run(params)
      .then(function () {
        Applicant.create(params)
        .then(function (data) {
          resolve(data)
        })
        .catch(function (err) {
          reject(err)
        });
      })
      .catch(function (err) {
        reject(err)
      });
    });
  }
};
