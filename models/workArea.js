"use strict";

var Promise = require("bluebird");

var Repository = require('./repository.js');

module.exports = {
  create: function (workArea) {
    return new Promise(function (resolve, reject) {
      Repository.create('work_areas', workArea)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  getID: function (workArea) {
    var params = {tableName: 'work_areas', fieldName: 'name', value: workArea};
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
