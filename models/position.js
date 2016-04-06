;(function () {
  "use strict";

  var db = require('../db');
  var repository = require('./repository.js');
  var Promise = require("bluebird");

  module.exports = {

    list: function () {
      return new Promise(function (resolve, reject) {
        repository.list('position').then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    show: function (id) {
      return new Promise(function (resolve, reject) {
        repository.show('position', id).then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    create: function (position) {
      return new Promise(function (resolve, reject) {
        repository.create('position', position).then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    update: function (id, position) {
      return new Promise(function (resolve, reject) {
        repository.update('position', id, position).then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    }
  };
})();
