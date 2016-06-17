"use strict";

var _ = require('lodash');

var models = require('../models/index');

var JobStageService = {

  createMultiple: function (jobID, stageParams, t) {
    return models.sequelize.Promise.map(stageParams, function (stageParam) {
      stageParam.job_id = jobID;
      stageParam.stage_id = stageParam.id;
      delete stageParam.id;
      return models.JobStage.create(stageParam, {transaction: t})
    })
  },

  updateMultiple: function (jobID, stageParams, t) {
    return models.sequelize.Promise.map(stageParams, function (stageParam) {
      stageParam.stage_id = stageParam.id;
      delete stageParam.id;
      return models.JobStage.findOne({
        where: {
          stage_id: stageParam.stage_id,
          job_id: jobID
        }
      })
      .then(function (jobStage) {
        if (jobStage) {
          return jobStage.updateAttributes(stageParam, {transaction: t});
        }
        else {
          stageParam.job_id = jobID;
          return models.JobStage.create(stageParam, {transaction: t})
        }
      });
    })
    .then(function () {
      return JobStageService.removeNotUsedJobStage(jobID, stageParams, t)
    });
  },

  validatePresenceOfAllDefaultStageWithPrecedence: function (jobStageParams) {
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
  },

  removeNotUsedJobStage: function (jobId, stageParams, t) {
    var activeStageIDs = _.map(stageParams, "stage_id");

    return models.JobStage.findAll({
      where: {
        job_id: jobId,
        stage_id: {
          not: activeStageIDs
        }
      }
    })
    .then(function (notUsedJobStages) {
      return models.sequelize.Promise.map(notUsedJobStages, function (notUsedJobStage) {
        return notUsedJobStage.destroy({transaction: t})
      })
    });
  }
};

module.exports = JobStageService;
