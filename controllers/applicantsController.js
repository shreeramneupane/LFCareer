;(function () {
  "use strict";

  var Applicant = require('../services/applicantService');
  var HttpStatus = require('http-status-codes');
  var moment = require('moment');
  var multer = require('multer');
  var s3 = require('multer-s3');


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

  exports.create = function (request, response) {
    var applicant = request.body.applicant;

    Applicant.create(applicant, function (error, applicant) {
      if (error) {
        response.status(HttpStatus.BAD_REQUEST).json({error: error})
      }
      response.status(HttpStatus.OK).json(applicant)
    })
  };

  exports.upload_resume = function (req, response) {


//    var applicant_resume = request.file;
//    console.log(applicant_resume)


//    Applicant.create(applicant, function (error, applicant) {
//      if (error) {
//        response.status(HttpStatus.BAD_REQUEST).json({error: error})
//      }
//      response.status(HttpStatus.OK).json(applicant)
//    })
  };
})();
