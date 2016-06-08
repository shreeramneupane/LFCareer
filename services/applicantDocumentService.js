"use strict";

var _ = require('lodash');
var fs = require('fs');
var Promise = require("bluebird");
var S3FS = require('s3fs');

var config;
var fileName = "../secret-config.json";
var models = require('../models/index');

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

  create: function (applicantID, documents) {
    var params = {
      'applicant_id': applicantID
    };

    return new Promise(function (resolve, reject) {
      var resume = documents.resume;
      var profile_picture = documents.profile_picture;

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

      params['resume'] = applicantID + '/resume/' + resume.originalFilename;
      params['profile_picture'] = applicantID + '/profile_picture/' + profile_picture.originalFilename;

      return models.ApplicantDocument.create(params)
      .then(function (data) {
        resolve({applicant_document: data})
      })
      .catch(function (err) {
        reject(err)
      });
    });
  }
};


