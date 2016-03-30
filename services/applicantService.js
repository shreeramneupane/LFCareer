;
(function () {
  "use strict";

  var checkit = require('checkit');
  var uuid = require('node-uuid');
  var validation = new checkit(require('../validation/applicantValidation'));
  var Applicant = require('../models/applicant');

// Create new applicant
  exports.create = function (applicant, callback) {
    validation.run(applicant)
    .then(function () {
      applicant.id = uuid.v1();
      Applicant.create(applicant, callback)
    })
    .catch(function (error) {
      callback(error, applicant);
    });
  };

  // Upload resume
  exports.upload_resume = function (position, callback) {
    validation.run(position)
    .then(function () {
      position.id = uuid.v1();
      Position.create(position, callback)
    })
    .catch(function (error) {
      callback(error, position);
    });
  };
})();
