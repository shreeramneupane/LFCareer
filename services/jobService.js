"use strict";

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
      .then(function (response) {
        resolve(response);
      })

      .catch(function (err) {
        reject(err);
      });
    });
  },

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
