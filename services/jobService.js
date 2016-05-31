"use strict";

<<<<<<< HEAD
var checkit = require('checkit');
var uuid = require('node-uuid');
var validation = new checkit(require('../validation/jobValidation'));
var Job = require('../models/job');
var _ = require('lodash');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      Job.list()
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      Job.show(id)
=======
var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var Job = require('../models/job');
var AppError = require('../error/AppError');
var Validation = new Checkit(require('../validation/jobValidation'));

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      Job.list()
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

<<<<<<< HEAD
  create: function (job) {
    return new Promise(function (resolve, reject) {
      validation.run(job)
      .then(function () {
        job.id = uuid.v1();
        Job.create(job)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
=======
  show: function (id) {
    return new Promise(function (resolve, reject) {
      Job.show(id)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      });
    });
  },

<<<<<<< HEAD
  update: function (id, job) {
    var job = _(job).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(job)
=======
  create: function (job) {
    return new Promise(function (resolve, reject) {
      Validation.run(job)
      .then(function () {
        job.id = UUID.v1();
        job.created_at = new Date();

        Job.create(job)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
      });
    });
  },

  update: function (id, job) {
    return new Promise(function (resolve, reject) {
      Validation.run(job)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      .then(function () {
        Job.update(id, job)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
      });
    });
  }
};
