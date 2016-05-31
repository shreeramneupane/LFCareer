"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");
var _ = require('lodash');

module.exports = {

  list: function (parsedUrl) {

    var searchStatement = _.find(parsedUrl, { 'type': 'search' });
    var sortStatement = _.find(parsedUrl, { 'type': 'sort' });
    var filterStatement = [];
    filterStatement = _.filter(parsedUrl, { 'type': 'filter' });
    var paginationAttribute =  _.find(parsedUrl, { 'type': 'paginate' });

    return new Promise(function (resolve, reject) {
<<<<<<< HEAD
      repository.list('applicant', searchStatement, filterStatement, sortStatement , paginationAttribute, jointFields)
=======
      db('applicants')
      .join('applicant_uploads', 'applicants.id', '=', 'applicant_uploads.applicant_id')
      .select('applicants.id','applicants.name', 'applicants.email', 'applicants.address', 'applicants.phone_number', 'applicants.cover_letter', 'applicants.applied_date', 'applicant_uploads.resume', 'applicant_uploads.profile_picture')
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.show('applicant', id, jointFields)
=======
      db('applicants')
      .join('applicant_uploads', 'applicants.id', '=', 'applicant_uploads.applicant_id')
      .select('applicants.id','applicants.name', 'applicants.email', 'applicants.address', 'applicants.phone_number', 'applicants.cover_letter', 'applicants.applied_date', 'applicant_uploads.resume', 'applicant_uploads.profile_picture').where("id", id).first()
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.create('applicant', applicant)
      .then(function (data) {
=======
      repository.create('applicants', applicant).then(function (data) {
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, applicant) {
    return new Promise(function (resolve, reject) {
<<<<<<< HEAD
      repository.update('applicant', id, applicant)
      .then(function (data) {
=======
      repository.update('applicants', id, applicant).then(function (data) {
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },
};
var jointFields = [{
  table_name: 'applicant_upload',
  attributes: ['resume', 'profile_picture']
}];
