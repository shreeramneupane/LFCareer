"use strict";

var db = require('../db');
var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      db('applicant')
      .join('applicant_upload', 'applicant.id', '=', 'applicant_upload.applicant_id')
      .select('applicant.id','applicant.name', 'applicant.email', 'applicant.address', 'applicant.phone_number', 'applicant.cover_letter', 'applicant.applied_date', 'applicant_upload.resume', 'applicant_upload.profile_picture')
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },
  show: function (id) {
    return new Promise(function (resolve, reject) {
      db('applicant')
      .join('applicant_upload', 'applicant.id', '=', 'applicant_upload.applicant_id')
      .select('applicant.id','applicant.name', 'applicant.email', 'applicant.address', 'applicant.phone_number', 'applicant.cover_letter', 'applicant.applied_date', 'applicant_upload.resume', 'applicant_upload.profile_picture').where("id", id).first()
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (applicant) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant', applicant).then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, applicant) {
    return new Promise(function (resolve, reject) {
      repository.update('applicant', id, applicant).then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
