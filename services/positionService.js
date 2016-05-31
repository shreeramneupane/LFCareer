"use strict";

<<<<<<< HEAD
var checkit = require('checkit');
var uuid = require('node-uuid');
var validation = new checkit(require('../validation/positionValidation'));
var Position = require('../models/position');
var _ = require('lodash');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

module.exports = {

=======
var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var AppError = require('../error/AppError');
var Position = require('../models/position');
var Validation = new Checkit(require('../validation/positionValidation'));

module.exports = {
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
  list: function () {
    return new Promise(function (resolve, reject) {
      Position.list()
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
      Position.show(id)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (position) {
    return new Promise(function (resolve, reject) {
<<<<<<< HEAD
      validation.run(position)
      .then(function () {
        position.id = uuid.v1();
=======
      Validation.run(position)
      .then(function () {
        position.id = UUID.v1();
        position.created_at = new Date();

>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
        Position.create(position)
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

  update: function (id, position) {
<<<<<<< HEAD
    var position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(position)
=======
    return new Promise(function (resolve, reject) {
      Validation.run(position)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      .then(function () {
        Position.update(id, position)
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
