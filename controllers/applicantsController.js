"use strict";

var fs = require('fs');
var S3FS = require('s3fs');
var utilityService = require('../services/utilityService');
var applicantService = require('../services/applicantService');
var applicantUploadService = require('../services/applicantUploadService');
var HttpStatus = require('http-status-codes');
var Applicant = require('../models/applicant');
var ApplicantUpload = require('../models/applicant_upload');
var fileName = "../secret-config.json";
var config;

try {
  config = require(fileName)
}
catch (err) {
  config = {};
  console.log("unable to read file '" + fileName + "': ", err)
  console.log("see secret-config-sample.json for an example")
}

var _ = require('lodash');

var s3fsImpl = new S3FS(config['bucket_name'], {
  accessKeyId: config['accessKeyId'],
  secretAccessKey: config['secretAccessKey']
});

module.exports = {

  index: function (request, response) {
    //Handling the promise here
    Applicant.index()
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      err = 'Cannot fetch applicants';
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },

  show: function (request, response) {
    var id = request.params.id;

    Applicant.show(id)
    .then(function (data) {
      if (typeof data === 'undefined') {
        throw new Error();
      }
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      err = 'Can not fetch applicant with id: ' + id;
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },

  create: function (request, response) {
    var applicant = request.body;

    applicantService.validate(applicant)
    .then(function () {
      utilityService.addUUID(applicant);
      Applicant.create(applicant)
      .then(function (data) {
        response.status(HttpStatus.OK).json(applicant)
      })
      .catch(function (err) {
        err = "Can not create new applicant with provided parameters.";
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    })
    .catch(function (err) {
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  },
  upload_files: function (request, response) {
    applicantUploadService.upload_files(request)
    .then(function (upload_files) {
      response.status(HttpStatus.OK).json(upload_files)
    })
    .catch(function (err) {
      err = "Can not create new applicant with provided parameters.";
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
//
//
//    var params = {'applicant_id': request.body.applicant_id, 'resume': request.files.resume, 'profile_picture': request.files.profile_picture};
//
//    applicantUploadService.validate(params)
//    .then(function () {
//      var resume = request.files.resume;
//      var profile_picture = request.files.profile_picture;
//
//      var resume_stream = fs.createReadStream(resume.path);
//      var profile_picture_stream = fs.createReadStream(profile_picture.path);
//
//      return s3fsImpl.writeFile(resume.originalFilename, resume_stream, {ACL: 'public-read'}).then(function () {
//        fs.unlink(resume.path, function (err) {
//          if (err)
//            console.log(err)
//        });
//      });
//
//      return s3fsImpl.writeFile(profile_picture.originalFilename, profile_picture_stream, {ACL: 'public-read'}).then(function () {
//        fs.unlink(profile_picture.path, function (err) {
//          if (err)
//            console.log(err)
//        });
//      });
//
//    })
//    .then(function () {
//      ApplicantUpload.create(params)
//      .then(function (data) {
//        response.status(HttpStatus.OK).json(params)
//      })
//      .catch(function (err) {
//        response.status(HttpStatus.BAD_REQUEST).json({error: err});
//      });
//    })
//    .catch(function (err) {
//      response.status(HttpStatus.BAD_REQUEST).json({error: err});
//    });
  },
  update: function (request, response) {
    var id = request.params.id;
    var applicant = request.body;

    applicant = _(applicant).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

    applicantService.validate(applicant)
    .then(function () {
      Applicant.update(id, applicant)
      .then(function (data) {
        Applicant.show(data[0])
        .then(function (updatedApplicant) {
          response.status(HttpStatus.OK).json(updatedApplicant)
        })
      })
      .catch(function (err) {
        err = "Can not update applicant with provided parameters.";
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    })
    .catch(function (err) {
      response.status(HttpStatus.BAD_REQUEST).json({error: err});
    });
  }
};
