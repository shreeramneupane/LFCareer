;(function () {
  "use strict";

  var Applicant = require('../models/applicant');
  var HttpStatus = require('http-status-codes');

  exports.Index = function(req, res){
    Applicant.Index(function (err, applicants) {
      if(err){
        console.log(err)
      }
      else
      {
        res.send(applicants)
      }
    })
  };

  exports.Create = function (request, response) {
    var position = request.body.position;

    var applicantJSON = {
      name: applicant.name.trim(),
      email: applicant.email.trim(),
      address: applicant.address.trim(),
      phone_number: applicant.phone_number.trim(),
      linkedin: applicant.linkedin.trim(),
      profile_image: applicant.profile_image.trim(),
      resume: applicant.resume.trim(),
      cover_letter: applicant.cover_letter.trim(),
      notification: applicant.notification.trim(),
      source: applicant.source.trim(),
      applied_date:
    };

    Position.create(applicantJSON, function (error, applicant) {
      if (error) {
        response.status(HttpStatus.BAD_REQUEST).json({error: error})
      }
      response.status(HttpStatus.OK).json(applicant)
    })
  };
})();
