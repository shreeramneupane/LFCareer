;
(function () {
  "use strict";

  var checkit = require('checkit');
  var db = require('../db');
  var validation = new checkit(require('../validation/applicantValidation'));

  // List all Applicants
  exports.Index = function (callback) {
      db.select("name","email","address","phone_number","linkedin").from("applicant").then(function (response) {
        callback(null, response);
      })
      .catch(function (error) {
        callback(error, applicantJSON);
      });
  };


// Create new applicant
  exports.create = function (applicantJSON, callback) {
    var applicant = {
      name: applicantJSON.name,
      email: applicantJSON.email,
      address: applicantJSON.address,
      phone_number: applicantJSON.phone_number,
//      linkedin: applicant.linkedin.trim(),
//      profile_image: applicant.profile_image.trim(),
//      resume: applicant.resume.trim(),
      cover_letter: applicantJSON.cover_letter,
//      notification: applicant.notification.trim(),
//      source: applicant.source.trim(),
      applied_date: applicantJSON.applied_date
    };
    console.log(applicantJSON);

    validation.run(applicantJSON)
    .then(function () {
      db('applicant')
      .returning('id')
      .insert(applicantJSON)
      .then(function (response) {
        applicantJSON.id = response[0];
        callback(null, applicantJSON);
      })
      .catch(function (error) {
        callback(error, applicantJSON);
      });
    })
    .catch(function (error) {
      callback(error, applicantJSON);
    });
  };
})();
