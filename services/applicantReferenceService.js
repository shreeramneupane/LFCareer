"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var ApplicantReference = require('../models/applicantReference');
var Validation = new Checkit(require('../validation/applicantReferenceValidation'));

module.exports = {
  create: function (applicantID, applicantReferenceParams) {
    return Promise.join(
    applicantReferenceParams.forEach(function (param) {
      param.id = UUID.v1();
      param.applicant_id = applicantID;
      param.created_at = new Date();

      new Promise(function (resolve, reject) {
        Validation.run(param)
        .then(function () {
          ApplicantReference.create(param)
          .then(function () {
            resolve();
          })
        })
        .catch(function (err) {
          reject(err);
        })
      });
    })
    );
  }
};


