"use strict";

var Promise = require("bluebird");

var models = require('../models/index');

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      models.Job.findAll({})
      .then(function (response) {
        resolve({jobs: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      models.Job.find({where: {id: id}})
      .then(function (response) {
        resolve({job: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (jobParam) {
    return new Promise(function (resolve, reject) {
      models.Job.create(jobParam)
      .then(function (response) {
        resolve({job: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, jobParams) {
    return new Promise(function (resolve, reject) {
      models.Job.find({
        where: {
          id: id
        }
      })
      .then(function(job) {
        if(job){
          job.updateAttributes(jobParams)
          .then(function(response) {
            resolve({job: response});
          });
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
