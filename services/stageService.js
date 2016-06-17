"use strict";

var Promise = require("bluebird");

var models = require('../models/index');

var QueryParser = require('../helpers/queryParser');

module.exports = {

  list: function (query) {
    var parsedQuery = QueryParser.parse(models.Stage, query);

    return new Promise(function (resolve, reject) {
      models.Stage.findAndCountAll(parsedQuery)
      .then(function (response) {
        resolve({stages: response.rows, total_count: response.count});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      models.Stage.find({where: {id: id}})
      .then(function (response) {
        resolve({stage: response});
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

  update: function (id, stageParam) {
    return new Promise(function (resolve, reject) {
      models.Stage.find({
        where: {
          id: id
        }
      })
      .then(function(stage) {
        if(stage){
          stage.updateAttributes(stageParam)
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
