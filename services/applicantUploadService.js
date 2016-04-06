"use strict";

var checkit = require('checkit');
var validation = new checkit(require('../validation/applicantUploadValidation'));
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

module.exports = {

  upload_files: function (err, request) {

    console.log('here')
    var params = {'applicant_id': request.body.applicant_id, 'resume': request.files.resume, 'profile_picture': request.files.profile_picture};

    validation.run(params).
    then(function () {
      var resume = request.files.resume;
      var profile_picture = request.files.profile_picture;

      var resume_stream = fs.createReadStream(resume.path);
      var profile_picture_stream = fs.createReadStream(profile_picture.path);

      s3fsImpl.writeFile(resume.originalFilename, resume_stream, {ACL: 'public-read'}).then(function () {
        fs.unlink(resume.path, function (err) {
          if (err)
            console.log(err)
        });
      });

      s3fsImpl.writeFile(profile_picture.originalFilename, profile_picture_stream, {ACL: 'public-read'}).then(function () {
        fs.unlink(profile_picture.path, function (err) {
          if (err)
            console.log(err)
        });
      });

    })
    .then(function () {
      ApplicantUpload.create(params)
      .then(function (data) {
        response.status(HttpStatus.OK).json(data)
      })
      .catch(function (err) {
        console.log(err);
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    })
    .catch(function (err) {
      console.log('sdkfjds');
      return err;
    });
  }
};
