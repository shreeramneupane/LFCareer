;
(function () {
  "use strict";

  var checkit = require('checkit');
  var db = require('../db');
  var validation = new checkit(require('../validation/applicantValidation'));

  // List all Applicants
  exports.Index = function (callback) {
    db.select("name", "email", "address", "phone_number", "linkedin").from("applicant").then(function (response) {
      callback(null, response);
    })
    .catch(function (error) {
      callback(error, applicantJSON);
    });
  };

// Create new applicant
  exports.create = function (applicant, callback) {
    db('applicant')
    .returning('id')
    .insert(applicant)
    .then(function (response) {
      applicant.id = response[0];
      callback(null, applicant);
    })
    .catch(function (error) {
      callback(error, applicant);
    });
  };
})();
