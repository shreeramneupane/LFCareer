"use strict";

var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Repository.list('positions')
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      Repository.show('positions', id)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (position) {
    return new Promise(function (resolve, reject) {
      Repository.create('positions', position)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, position) {
    return new Promise(function (resolve, reject) {
      Repository.update('positions', id, position)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
