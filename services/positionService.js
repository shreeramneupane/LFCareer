"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var AppError = require('../error/AppError');
var Position = require('../models/position');
var Validation = new Checkit(require('../validation/positionValidation'));

module.exports = {
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
      Validation.run(position)
      .then(function () {
        position.id = UUID.v1();
        position.created_at = new Date();

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
    return new Promise(function (resolve, reject) {
      Validation.run(position)
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
