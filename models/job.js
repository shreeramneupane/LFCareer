"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      repository.list('job')
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    var nestedFields = [{
      table_name: 'position',
      attributes: ['title', 'specification']
    }];
    return new Promise(function (resolve, reject) {
      repository.show('job', id, nestedFields)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (job) {
    return new Promise(function (resolve, reject) {
      repository.create('job', job)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, job) {
    return new Promise(function (resolve, reject) {
      repository.update('job', id, job)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
