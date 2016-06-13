"use strict";

var fs = require('fs');
var Promise = require("bluebird");
var S3FS = require('s3fs');

var config;
var env = process.env.NODE_ENV || 'development';
var fileName = "../secret-config.json";
var models = require('../models/index');

try {
  config = require(fileName)[env]
}
catch (err) {
  config = {};
  console.log("unable to read file '" + fileName + "': ", err);
  console.log("see secret-config-sample.json for an example");
}

var s3fsImpl = new S3FS(config['bucket_name'], {
  accessKeyId: config['accessKeyId'],
  secretAccessKey: config['secretAccessKey']
});

module.exports = {

  create: function (applicantID, documents) {

    return new Promise(function (resolve, reject) {
      var resume = documents.resume;
      var profilePicture = documents.profile_picture;

      var resumeStream = fs.createReadStream(resume.path);
      var profilePictureStream = fs.createReadStream(profilePicture.path);

      var resumeURL = applicantID + '/resume/' + resume.originalFilename;
      var profilePictureURL = applicantID + '/profile_picture/' + profilePicture.originalFilename;

      s3fsImpl.writeFile(resumeURL, resumeStream, {ACL: 'public-read'}).then(function () {
        fs.unlink(resume.path, function (err) {
          if (err)
            reject(err)
        });
      });
      s3fsImpl.writeFile(profilePictureURL, profilePictureStream, {ACL: 'public-read'}).then(function () {
        fs.unlink(profilePicture.path, function (err) {
          if (err)
            reject(err)
        });
      });

      var params = {
        applicant_id: applicantID,
        resume: resumeURL,
        profile_picture: profilePictureURL
      };
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


