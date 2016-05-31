"use strict";

<<<<<<< HEAD
var checkit = require('checkit');
var uuid = require('node-uuid');
var validation = new checkit(require('../validation/stageValidation'));
var Stage = require('../models/stage');
var _ = require('lodash');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

module.exports = {

=======
var Checkit = require('checkit');
var Promise = require("bluebird");
var UUID = require('node-uuid');

var AppError = require('../error/AppError');
var Stage = require('../models/stage');
var Validation = new Checkit(require('../validation/stageValidation'));

module.exports = {
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      });
    });
  },

  create: function (stage) {
    return new Promise(function (resolve, reject) {
      validation.run(stage)
      .then(function () {
        stage.id = uuid.v1();
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
=======
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      });
    });
  },

<<<<<<< HEAD
  update: function (id, stage) {
    var stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(stage)
      .then(function () {
        Stage.update(id, stage)
=======
  create: function (stage) {
    return new Promise(function (resolve, reject) {
      Validation.run(stage)
      .then(function () {
        stage.id = UUID.v1();
        stage.created_at = new Date();

        Stage.create(stage)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
=======
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
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
  }
};
