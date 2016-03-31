"use strict";

var db = require('../db');
var HttpStatus = require('http-status-codes');

exports.create = function (table, entity, callback) {

  db(table)
  .insert(entity)
  .then(function (response) {
    callback(null);
  })
  .catch(function (err) {
    var error = {
      message: err.message,
      code: HttpStatus.INTERNAL_SERVER_ERROR
    };
    callback(error);
  });
};
