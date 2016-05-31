"use strict";

<<<<<<< HEAD
var repository = require('./repository.js');
var Promise = require("bluebird");

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      repository.list('position')
=======
var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      Repository.list('positions')
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
      repository.show('position', id)
=======
      Repository.show('positions', id)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.create('position', position)
=======
      Repository.create('positions', position)
>>>>>>> a1c658d348d186b619afb9ce742ee6085eb53c75
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
<<<<<<< HEAD
      repository.update('position', id, position)
=======
      Repository.update('positions', id, position)
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
