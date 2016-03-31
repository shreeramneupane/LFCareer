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

  console.log(req.files)

    var upload = multer({
      storage: s3({
        dirname: 'uploads/resume',
        bucket: 'com.lftechnology.career',
        secretAccessKey: 'qfwQWVUwt768xiDPAlCvUmRsOeFpcXK21HYAccKo',
        accessKeyId: 'AKIAISAQ5F3H2CD42MRA',
        region: 'us-east-1',
        filename: function (req, file, cb) {
          cb(null, Date.now())
        }
      })
    });
    var test = upload.array('photos', 3);
    console.log(test)

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
