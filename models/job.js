"use strict";

<<<<<<< HEAD
var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      repository.list('job')
=======
var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Repository.list('jobs')
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
<<<<<<< HEAD
    var nestedFields = [{
      table_name: 'position',
      attributes: ['title', 'specification']
    }];
    return new Promise(function (resolve, reject) {
      repository.show('job', id, nestedFields)
=======
    return new Promise(function (resolve, reject) {
      Repository.show('jobs', id)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.create('job', job)
=======
      Repository.create('jobs', job)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.update('job', id, job)
=======
      Repository.update('jobs', id, job)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
