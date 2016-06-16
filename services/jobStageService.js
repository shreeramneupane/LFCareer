"use strict";

var models = require('../models/index');

module.exports = {

  createMultiple: function (jobID, stageParams, t) {
    return models.sequelize.Promise.map(stageParams, function (stageParam) {
      stageParam.job_id = jobID;
      stageParam.stage_id = stageParam.id;
      return models.JobStage.create(stageParam, {transaction: t})
    });
  }
};
