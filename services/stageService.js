"use strict";

var Promise = require("bluebird");

var models = require('../models/index');

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      models.Stage.findAll({})
      .then(function (response) {
        resolve({stages: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (jobParam) {
    return new Promise(function (resolve, reject) {
      models.Stage.create(jobParam)
      .then(function (response) {
        resolve({stage: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, stageParams) {
    return new Promise(function (resolve, reject) {
      models.Stage.find({
        where: {
          id: id
        }
      })
      .then(function(stage) {
        if(stage){
          stage.updateAttributes(stageParams)
          .then(function(response) {
            resolve({stage: response});
          });
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
