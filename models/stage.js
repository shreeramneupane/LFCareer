"use strict";

var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Repository.list('stages')
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
      Repository.show('stages', id)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (stage) {
    return new Promise(function (resolve, reject) {
      Repository.create('stages', stage)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, stage) {
    return new Promise(function (resolve, reject) {
      Repository.update('stages', id, stage)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
