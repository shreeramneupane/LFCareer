"use strict";

var db = require('../db');
var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function (associatedFields, searchParam) {
    return new Promise(function (resolve, reject) {
      
      repository.list('applicant', associatedFields, searchParam)
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
      /**
       * Contains associated information of applicant  in applicant_upload table.
       */
      var associatedFields = [{
        table_name: 'applicant_upload',
        attributes: ['resume', 'profile_picture']
      }];
      repository.show('applicant', id, associatedFields)
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
      repository.create('applicant', applicant)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, applicant) {
    return new Promise(function (resolve, reject) {
      repository.update('applicant', id, applicant)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
