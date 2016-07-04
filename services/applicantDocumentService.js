"use strict";

var fs = require('fs');
var Promise = require("bluebird");
var S3FS = require('s3fs');
var request = require('request').defaults({encoding: null});

var config;
var env = process.env.NODE_ENV || 'development';
var fileName = "../config/secret_config/s3Config.json";
var models = require('../models/index');

try {
  config = require(fileName)[env]
}
catch (err) {
  config = {};
  console.log("unable to read file '" + fileName + "': ", err);
  console.log("see s3Config.json file inside config/secret-config directory for an example");
}

var s3fsImpl = new S3FS(config['bucket_name'], {
  accessKeyId: config['accessKeyId'],
  secretAccessKey: config['secretAccessKey']
});

var ApplicantDocumentService = {

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
  },

  /**
   * Provide the base64 conversion of the applicant document
   * @param applicantID [String] UUID of the applicant database record
   * @param documentType [String] defines which document of applicant, example: resume and profile_picture
   */
  show: function (applicantID, documentType) {
    return new Promise(function (resolve, reject) {
      models.Applicant.findOne({
        where: {
          id: applicantID
        }
      })
      .then(function (applicant) {
        applicant.getApplicantDocument()
        .then(function (document) {
          if (!document) {
            throw new Error("Can't found " + documentType + " of the provided applicant!");
          }
          request.get(ApplicantDocumentService.getFullURL(document[documentType]), function (err, response, body) {
            if (err) {
              new Error("Can't download " + documentType + " of the provided applicant.");
            }
            else if (response.statusCode == 200) {
              var filePath = response.request.uri.path;
              var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
              resolve({[documentType]: data, extension: filePath.substr(filePath.lastIndexOf('.')+1)});
            }
          });
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  getFullURL: function (url) {
    return 'http://' + config['bucket_name'] + '.s3.amazonaws.com/' + url;
  }
};

module.exports = ApplicantDocumentService;
