"use strict";

var fs = require('fs');
var S3FS = require('s3fs');
var checkit = require('checkit');
var validation = new checkit(require('../validation/applicantUploadValidation'))
var ApplicantUpload = require('../models/applicant_upload');
var _ = require('lodash');
var AppError = require('../error/AppError');
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

var s3fsImpl = new S3FS(config['bucket_name'], {
  accessKeyId: config['accessKeyId'],
  secretAccessKey: config['secretAccessKey']
});

module.exports = {
  upload_files: function (request) {
    var params = {'applicant_id': request.body.applicant_id, 'resume': request.files.resume, 'profile_picture': request.files.profile_picture};
    return new Promise(function (resolve, reject) {
      validation.run(params)
      .then(function () {
        var resume = request.files.resume;
        var profile_picture = request.files.profile_picture;

        var resume_stream = fs.createReadStream(resume.path);
        var profile_picture_stream = fs.createReadStream(profile_picture.path);

        s3fsImpl.writeFile(resume.originalFilename, resume_stream, {ACL: 'public-read'}).then(function () {
          fs.unlink(resume.path, function (err) {
            if (err)
              reject(err)
          });
        });

        s3fsImpl.writeFile(profile_picture.originalFilename, profile_picture_stream, {ACL: 'public-read'}).then(function () {
          fs.unlink(profile_picture.path, function (err) {
            if (err)
              reject(err)
          });
        });

        params['resume'] = 'recruitments/' + resume.originalFilename
        params['profile_picture'] = 'recruitments/' + profile_picture.originalFilename

      })
      .then(function () {
        ApplicantUpload.create(params)
        .then(function (data) {
          resolve(data)
        })
        .catch(function (err) {
          reject(err)
        });
      })
      .catch(function (err) {
        reject(err)
      });
    });
  },

  update_files: function (id, request) {

    var params = { 'applicant_id': id, 'resume': request.files.resume, 'profile_picture': request.files.profile_picture};

    var params = _(params).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(params)
      .then(function () {
        var resume = request.files.resume;
        var profile_picture = request.files.profile_picture;

        var resume_stream = fs.createReadStream(resume.path);
        var profile_picture_stream = fs.createReadStream(profile_picture.path);

        s3fsImpl.writeFile(resume.originalFilename, resume_stream, {ACL: 'public-read'}).then(function () {
          fs.unlink(resume.path, function (err) {
            if (err)
              reject(err)
          });
        });

        s3fsImpl.writeFile(profile_picture.originalFilename, profile_picture_stream, {ACL: 'public-read'}).then(function () {
          fs.unlink(profile_picture.path, function (err) {
            if (err)
              reject(err)
          });
        });

        params['resume'] = 'recruitments/' + resume.originalFilename
        params['profile_picture'] = 'recruitments/' + profile_picture.originalFilename

      })
      .then(function () {
        ApplicantUpload.update(id, params)
        .then(function (data) {
          resolve(data)
        })
        .catch(function (err) {
          console.log(err)

          reject(err)
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error)
      });
    });
  }
};
