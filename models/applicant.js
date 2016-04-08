"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function (searchParam, associatedFields, filterParam) {
    return new Promise(function (resolve, reject) {

      repository.list('applicant', searchParam, associatedFields, filterParam)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id, associatedFields) {
    return new Promise(function (resolve, reject) {
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
