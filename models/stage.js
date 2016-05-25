;
(function () {
  "use strict";

  var db = require('../db');
  var repository = require('./repository.js');
  var Promise = require("bluebird");

  module.exports = {

    list: function () {
      return new Promise(function (resolve, reject) {
        repository.list('stages').then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    show: function (id) {
      return new Promise(function (resolve, reject) {
        repository.show('stages', id).then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    create: function (stage) {
      return new Promise(function (resolve, reject) {
        repository.create('stages', stage).then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    update: function (id, stage) {
      return new Promise(function (resolve, reject) {
        repository.update('stages', id, stage).then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    }
  };
})();
