"use strict";

var _ = require("lodash");
var Promise = require("bluebird");

var models = require('../models/index');

var JobStageService = require('../services/jobStageService');

module.exports = {

  list: function () {
    return new Promise(function (resolve, reject) {
      models.Job.findAndCountAll({})
      .then(function (response) {
        resolve({jobs: response.rows, total_count: response.count});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      models.Job.find({
        where: {
          id: id
        },
        include: [
          {model: models.Stage}]
      })
      .then(function (job) {
        var job = job.dataValues;
        job.stages = _.map(job.Stages, 'dataValues');
        delete job.Stages;
        _.each(job.stages, function (stage) {
          stage.precedence_number = stage.JobStage.precedence_number;
        });
        job.stages = _.sortBy(_.map(job.stages, _.partialRight(_.pick, 'id', "title", "precedence_number")), 'precedence_number');
        resolve({job: job});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (jobParam) {
    var jobID;

    return new Promise(function (resolve, reject) {
      return models.sequelize.transaction()
      .then(function (t) {
        return models.Job.create(jobParam, {transaction: t})
        .then(function (job) {
          jobID = job.id;
          return validatePresenceOfAllDefaultStageWithPrecedence(jobParam['stages'])
          .then(function () {
            return JobStageService.createMultiple(jobID, jobParam['stages'], t)
          });
        })
        .then(function () {
          return t.commit();
        })
        .catch(function (err) {
          t.rollback();
          throw new Error(err);
        });
      })
      .then(function () {
        models.Job.findOne({
          where: {
            id: jobID
          }
        })
        .then(function (job) {
          resolve({job: job});
        })
      })
      .catch(function (err) {
        reject(err);
      });

    });
  },

  update: function (id, jobParam) {
    return new Promise(function (resolve, reject) {
      models.Job.find({
        where: {
          id: id
        }
      })
      .then(function (job) {
        if (job) {
          job.updateAttributes(jobParam)
          .then(function (response) {
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

function validatePresenceOfAllDefaultStageWithPrecedence(jobStageParams) {
  return new Promise(function (resolve, reject) {
    var stages = _.map(jobStageParams, _.partialRight(_.pick, 'id', "precedence_number"));
    if (_.uniqBy(stages, 'id').length === stages.length && _.uniqBy(stages, 'precedence_number').length === stages.length) {
      var sortedStages = _.sortBy(stages, 'precedence_number');
      var previousPrecedenceNumber = 0;

      models.Stage.findAll({
        where: {is_default: true},
        attributes: ['id', 'precedence_number']
      }).then(function (response) {
        var defaultStages = _.sortBy(_.map(response, 'dataValues'), 'precedence_number');
        var defaultStagesIDs = _.map(defaultStages, "id");

        var sortedStagesOfDefaultType = [];
        sortedStages.forEach(function (sortedStage) {
          if (defaultStagesIDs.indexOf(sortedStage.id) > -1) {
            sortedStagesOfDefaultType.push(sortedStage);
          }
        });

        _.forEach(sortedStagesOfDefaultType, function (sortedStage) {
          previousPrecedenceNumber = previousPrecedenceNumber + 1;
          sortedStage.precedence_number = previousPrecedenceNumber;
        });

        if (_.isEqual(defaultStages, sortedStagesOfDefaultType)) {
          resolve(true);
        }
        else {
          reject(new Error("Please ensure to include all default stage with out fluctuating default precedence"));
        }
      })
      .catch(function (err) {
        reject(err);
      })
    }
    else {
      reject(new Error("Please be sure not to duplicate stage or precedence."));
    }
  });
}
