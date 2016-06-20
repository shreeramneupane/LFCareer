"use strict";

var _ = require("lodash");
var Promise = require("bluebird");

var models = require('../models/index');

var JobStageService = require('../services/jobStageService');

var JobService = {

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
          stage.is_active = stage.JobStage.is_active;
        });
        job.stages = _.map(job.stages, _.partialRight(_.pick, 'id', "title", "precedence_number", "is_active"));
        job.stages = _.sortBy(job.stages, 'precedence_number');
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
      models.sequelize.transaction()
      .then(function (t) {
        return models.Job.create(jobParam, {transaction: t})
        .then(function (job) {
          jobID = job.id;
          return JobStageService.validatePresenceOfAllDefaultStageWithPrecedence(jobParam['stages'])
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
        JobService.show(jobID)
        .then(function (createdJob) {
          resolve(createdJob);
        });
      })
      .catch(function (err) {
        reject(err);
      });

    });
  },

  update: function (id, jobParam) {
    var jobID;

    return new Promise(function (resolve, reject) {
      models.Job.find({
        where: {
          id: id
        }
      })
      .then(function (job) {
        if (job) {
          return models.sequelize.transaction()
          .then(function (t) {
            return job.updateAttributes(jobParam, {transaction: t})
            .then(function (job) {
              jobID = job.id;
              return models.Applicant.count({
                where: {
                  job_id: jobID
                }
              })
              .then(function (applicantCount) {
                if (applicantCount === 0) {
                  return JobStageService.validatePresenceOfAllDefaultStageWithPrecedence(jobParam['stages'])
                  .then(function () {
                    return JobStageService.updateMultiple(jobID, jobParam['stages'], t)
                  });
                }
              })
            })
            .then(function () {
              return t.commit();
            })
            .catch(function (err) {
              t.rollback();
              throw new Error(err);
            });
          });
        }
        else {
          throw new Error("Can't find job with provided id.")
        }
      })
      .then(function () {
        JobService.show(jobID)
        .then(function (job) {
          resolve(job);
        })
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};

module.exports = JobService;
