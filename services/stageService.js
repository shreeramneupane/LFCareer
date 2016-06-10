"use strict";

var Checkit = require('checkit');
var Promise = require("bluebird");
var UUID = require('node-uuid');

var AppError = require('../error/AppError');
var Stage = require('../models/stage');
var Validation = new Checkit(require('../validation/stageValidation'));

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Stage.list()
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
      Stage.show(id)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (stage) {
    return new Promise(function (resolve, reject) {
      Validation.run(stage)
      .then(function () {
        stage.id = UUID.v1();
        stage.created_at = new Date();

        Stage.create(stage)
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

  update: function (id, stage) {
    return new Promise(function (resolve, reject) {
      Validation.run(stage)
      .then(function () {
        stage.updated_at = new Date();

        Stage.update(id, stage)
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
