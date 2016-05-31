"use strict";

var Database = require('../db');
var Promise = require("bluebird");

var AppError = require('../error/AppError');

module.exports = {
  list: function (table) {
    return new Promise(function (resolve, reject) {
      Database(table).select()
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
      Database(table).where("id", id).first()
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
      Database(table)
      .insert(entity)
      .returning('*')
      .then(function (response) {
        resolve(response[0]);
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    })
  },

  update: function (table, id, entity) {
    return new Promise(function (resolve, reject) {
      Database(table)
      .where('id', id)
      .update(entity)
      .then(function () {
        Database(table).where("id", id).first()
        .then(function (updatedData) {
          resolve(updatedData);
        });
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  update_upload: function (table, id, entity) {
    return new Promise(function (resolve, reject) {
      Database(table)
      .where('applicant_id', id)
      .update(entity)
      .then(function () {
        Database(table).where("applicant_id", id).first()
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

