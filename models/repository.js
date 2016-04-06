"use strict";

var db = require('../db');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

module.exports = {
  list: function (table) {
    return new Promise(function (resolve, reject) {
      db(table).select()
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  show: function (table, id) {
    return new Promise(function (resolve, reject) {
      db(table).where("id", id).first()
      .then(function (response) {
        if (typeof response === 'undefined') {
          throw new Error();
        }
        resolve(response);
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  create: function (table, entity) {
    return new Promise(function (resolve, reject) {
      db(table)
      .insert(entity)
      .then(function (response) {
        resolve(entity);
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    })
  },

  update: function (table, id, entity) {
    return new Promise(function (resolve, reject) {
      db(table)
      .where('id', id)
      .update(entity)
      .then(function (response) {
        db(table).where("id", id).first()
        .then(function (updatedStage) {
          resolve(updatedStage);
        });
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  }
};

