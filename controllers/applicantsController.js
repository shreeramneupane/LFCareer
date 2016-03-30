;(function () {
  "use strict";

  var Applicant = require('../models/applicant');
  var HttpStatus = require('http-status-codes');
  var moment = require('moment');

  exports.Index = function(request, response){
    Applicant.Index(function (err, applicants) {
      if(err){
        console.log(err)
      }
      else
      {
        response.status(HttpStatus.OK).json(applicants)
      }
    })
  };

  exports.Create = function (request, response) {
    var applicant = request.body.applicant;

    var applicantJSON = {
      name: applicant.name.trim(),
      email: applicant.email.trim(),
      address: applicant.address.trim(),
      phone_number: applicant.phone_number.trim(),
//      linkedin: applicant.linkedin.trim(),
//      profile_image: applicant.profile_image.trim(),
//      resume: applicant.resume.trim(),
      cover_letter: applicant.cover_letter.trim(),
//      notification: applicant.notification.trim(),
//      source: applicant.source.trim(),
      applied_date: moment().format("YYYY-MM-DD")
    };

    Applicant.create(applicantJSON, function (error, applicant) {
      if (error) {
        response.status(HttpStatus.BAD_REQUEST).json({error: error})
      }
      response.status(HttpStatus.OK).json(applicant)
    })
  };
})();
