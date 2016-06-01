"use strict";

var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  create: function (skill) {
    return new Promise(function (resolve, reject) {
      Repository.create('skills', skill)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  getID: function (skill) {
    var params = {tableName: 'skills', fieldName: 'name', value: skill};
    return new Promise(function (resolve, reject) {
      Repository.getID(params)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
