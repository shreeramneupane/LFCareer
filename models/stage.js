"use strict";

<<<<<<< HEAD
var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      repository.list('stage')
=======
var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Repository.list('stages')
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.show('stage', id)
=======
      Repository.show('stages', id)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.create('stage', stage)
=======
      Repository.create('stages', stage)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.update('stage', id, stage)
=======
      Repository.update('stages', id, stage)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
