"use strict";

var checkit = require('checkit');
var uuid = require('node-uuid');
var validation = new checkit(require('../validation/positionValidation'));
var Position = require('../models/position');
var _ = require('lodash');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

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
      validation.run(position)
      .then(function () {
        position.id = uuid.v1();
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
    var position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(position)
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
