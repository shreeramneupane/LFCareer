"use strict";

var repository = require('./repository.js');

module.exports = {

  create: function (params) {
    return new Promise(function (resolve, reject) {
<<<<<<< HEAD
      repository.create('applicant_upload', params)
      .then(function (data) {
=======
      repository.create('applicant_uploads',params).then(function(data){
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (applicant_id, applicant_upload) {
    return new Promise(function (resolve, reject) {
<<<<<<< HEAD
      repository.update_upload('applicant_upload', applicant_id, applicant_upload)
      .then(function (data) {
=======
      repository.update_upload('applicant_uploads', applicant_id, applicant_upload).then(function (data) {
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
