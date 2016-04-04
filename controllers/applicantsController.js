"use strict";

var fs = require('fs');
var S3FS = require('s3fs');
var utilityService = require('../services/utilityService');
var applicantService = require('../services/applicantService');
var applicantUploadService = require('../services/applicantUploadService');
var HttpStatus = require('http-status-codes');
var Applicant = require('../models/applicant');
var credential = require('..')

var _ = require('lodash');

var s3fsImpl = new S3FS('recruitments', {
  accessKeyId: "AKIAJMNAK4GOPW2VJOWQ",
  secretAccessKey: "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"
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
    var resume = req.files.resume;
    var profile_picture = req.files.profile_picture;

    var stream = fs.createReadStream(file.path);
    return s3fsImpl.writeFile(file.originalFilename, stream, {ACL: 'public-read'}).then(function () {
      fs.unlink(file.path, function (err) {
        if (err)
          console.log(err)
      })
    });

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

  upload: function (request, response) {
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
