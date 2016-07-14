"use strict";

var _ = require("lodash");
var Promise = require("bluebird");

var models = require('../models/index');

var JobStageService = require('../services/jobStageService');
var env = process.env.NODE_ENV || 'development';
var request = require('request-promise');

var config = require("../config/secret_config/vyagutaService.json")[env];

var JobService = {

  list: function (status) {
    console.log(Date.now());
    var whereCondition = (status === 'closed' ? {where: {valid_until: {$lt: Date.now()}}} : status === 'open' ? {where: {valid_until: {$gt: Date.now()}}} : {});
    return new Promise(function (resolve, reject) {
      models.Job.findAndCountAll(whereCondition)
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
        job.concern_people = job.concern_people.split(',');
        job.stages = _.map(job.Stages, 'dataValues');
        delete job.Stages;
        _.each(job.stages, function (stage) {
          stage.precedence_number = stage.JobStage.precedence_number;
          stage.is_active = stage.JobStage.is_active;
        });
        job.stages = _.map(job.stages, _.partialRight(_.pick, 'id', "title", "precedence_number", "is_default"));
        job.stages = _.sortBy(job.stages, 'precedence_number');
        resolve({job: job});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (jobParam, authorizationToken) {
    var jobID;
    return new Promise(function (resolve, reject) {
      JobService.validateConcernPeople(jobParam.concern_people, authorizationToken)
      .then(function () {
        models.sequelize.transaction()
        .then(function (t) {
          jobParam.concern_people = jobParam.concern_people.toString();
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
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, jobParam, authorizationToken) {
    var jobID;

    return new Promise(function (resolve, reject) {
      models.Job.find({
        where: {
          id: id
        }
      })
      .then(function (job) {
        if (job) {
          return JobService.validateConcernPeople(jobParam.concern_people, authorizationToken)
          .then(function () {
            return models.sequelize.transaction()
            .then(function (t) {
              jobParam.concern_people = jobParam.concern_people.toString();
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
          })
          .catch(function (err) {
            throw new Error(err);
          })
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
  },

  validateConcernPeople: function (concernPeopleID, authorizationToken) {
    var concernPersonValidationURL;
    return new Promise(function (resolve, reject) {
      return Promise.map(concernPeopleID, function (concernPersonID) {
        concernPersonValidationURL = config['vyaguta_employee_detail_url'];
        concernPersonValidationURL = concernPersonValidationURL.replace(':id', concernPersonID);

        var options = {
          uri: concernPersonValidationURL,
          headers: {
            'Authorization': authorizationToken
          },
          json: true
        };
        return request(options)
        .then(function (response) {
          if (response.hrStatus.title !== config['vyaguta_employee_valid_hrStatus']) {
            throw new Error();
          }
        })
        .catch(function () {
          throw new Error();
        });
      })
      .then(function () {
        resolve(true);
      })
      .catch(function () {
        reject(new Error('Concern Person can not be validated.'));
      });
    })

  }
};

module.exports = JobService;
