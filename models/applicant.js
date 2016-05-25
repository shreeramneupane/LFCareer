"use strict";

var db = require('../db');
var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      db('applicants')
      .join('applicant_uploads', 'applicants.id', '=', 'applicant_uploads.applicant_id')
      .select('applicants.id','applicants.name', 'applicants.email', 'applicants.address', 'applicants.phone_number', 'applicants.cover_letter', 'applicants.applied_date', 'applicant_uploads.resume', 'applicant_uploads.profile_picture')
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
      db('applicants')
      .join('applicant_uploads', 'applicants.id', '=', 'applicant_uploads.applicant_id')
      .select('applicants.id','applicants.name', 'applicants.email', 'applicants.address', 'applicants.phone_number', 'applicants.cover_letter', 'applicants.applied_date', 'applicant_uploads.resume', 'applicant_uploads.profile_picture').where("id", id).first()
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
      repository.create('applicants', applicant).then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, applicant) {
    return new Promise(function (resolve, reject) {
      repository.update('applicants', id, applicant).then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
