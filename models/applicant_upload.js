"use strict";

var repository = require('./repository.js');

module.exports = {

  create: function (params) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant_upload', params)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (applicant_id, applicant_upload) {
    return new Promise(function (resolve, reject) {
      repository.update_upload('applicant_upload', applicant_id, applicant_upload)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
