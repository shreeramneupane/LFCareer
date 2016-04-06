"use strict";

var db = require('../db');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

module.exports = {
  list: function(table) {
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

  show: function(table, id, callback) {
    db(table).where("id", id).first()
    .then(function (response) {
      if (typeof response === 'undefined') {
        throw new Error();
      }
      callback(null, response);
    })
    .catch(function (err) {
      err = 'Can not fetch position with id: ' + id;
      callback(err, null);
    });
  },

  create: function (table, entity, callback) {
    db(table)
    .insert(entity)
    .then(function (response) {
      callback(null, entity);
    })
    .catch(function (err) {
      err = "Can not create new position with provided parameters.";
      callback(err);
    });
  },

  update: function(table, id, entity, callback) {
    db(table)
    .returning('id')
    .where('id', id)
    .update(entity)
    .then(function (response) {
      db(table).where("id", response[0]).first()
      .then(function (updatedPosition) {
        callback(null, updatedPosition);
      });
    })
    .catch(function (err) {
      err = "Can not update position with provided parameters.";
      callback(err, null);
    });
  }
};

