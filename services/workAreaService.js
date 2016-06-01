"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var WorkArea = require('../models/workArea');
var AppError = require('../error/AppError');
var Validation = new Checkit(require('../validation/workAreaValidation'));

var WorkAreaService = {

  create: function (workArea) {
    return new Promise(function (resolve, reject) {
      Validation.run(workArea)
      .then(function () {
        workArea.id = UUID.v1();
        workArea.created_at = new Date();

        WorkArea.create(workArea)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
      })
      .catch(function (err) {
        var error = AppError.validationError(err);
        reject(error);
      });
    });
  },

  getId: function (workArea) {
    return new Promise(function (resolve, reject) {
      WorkArea.getID(workArea)
      .then(function (response) {
        if (response === 'undefined') {
          WorkAreaService.create({name: workArea})
          .then(function(response){
            resolve(response.id);
          })
        }
        else {
          resolve(response);
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};

module.exports = WorkAreaService;
