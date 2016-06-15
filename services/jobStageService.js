"use strict";

var models = require('../models/index');

module.exports = {

  createMultiple: function (jobID, stageIDs, t) {
    return models.sequelize.Promise.map(stageIDs, function (stageID, index) {
      return models.JobStage.create({
        job_id: jobID,
        stage_id: stageID,
        precedence_number: index + 1
      }, {transaction: t})
    })
  }
};
