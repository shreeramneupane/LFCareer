"use strict";

var Checkit = require('checkit');
var UUID = require('node-uuid');
var Promise = require("bluebird");

var Skill = require('../models/skill');
var AppError = require('../error/AppError');
var Validation = new Checkit(require('../validation/skillValidation'));

var WorkAreaService = {

  create: function (skill) {
    return new Promise(function (resolve, reject) {
      Validation.run(skill)
      .then(function () {
        skill.id = UUID.v1();
        skill.created_at = new Date();

        Skill.create(skill)
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

  getId: function (skill) {
    return new Promise(function (resolve, reject) {
      Skill.getID(skill)
      .then(function (response) {
        if (response === 'undefined') {
          WorkAreaService.create({name: skill})
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
