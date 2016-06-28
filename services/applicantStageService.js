"use strict";

var _ = require('lodash');
var Promise = require("bluebird");

var models = require('../models/index');

var ApplicantStageRemarkService = require('../services/applicantStageRemarkService');
var ApplicantStageInterviewService = require('../services/applicantStageInterviewService');
var QueryParser = require('../helpers/queryParser');

var ApplicantStageService = {

  createDefault: function (applicantID, t) {
    return models.Stage.min('precedence_number')
    .then(function (minPrecedenceNumber) {
      return models.Stage.findOne({
        where: {
          precedence_number: minPrecedenceNumber
        }
      })
    })
    .then(function (stage) {
      return models.ApplicantStage.create({
        applicant_id: applicantID,
        stage_id: stage.id
      }, {transaction: t})
    })
  },

  timeline: function (applicantID, authorizationToken) {
    return new Promise(function (resolve, reject) {
      models.ApplicantStage.findAndCountAll({
        where: {
          applicant_id: applicantID
        },
        include: [
          {model: models.Stage},
          {model: models.ApplicantStageRemark},
          {model: models.ApplicantStageInterview}
        ]
      })
      .then(function (response) {
        var applicantStages = _.map(response.rows, 'dataValues');
        _.each(applicantStages, function (applicantStage) {
          applicantStage.stage = applicantStage.Stage;
          applicantStage.remark = null;
          applicantStage.interview = null;
          if (applicantStage.ApplicantStageRemark) {
            applicantStage.remark = applicantStage.ApplicantStageRemark.remark;
          }
          if (applicantStage.ApplicantStageInterview) {
            applicantStage.interview = applicantStage.ApplicantStageInterview;
            applicantStage.interview['dataValues'].interviewers = null;
          }
          delete applicantStage.Stage;
          delete applicantStage.ApplicantStageRemark;
          delete applicantStage.ApplicantStageInterview;
        });

        Promise.map(applicantStages, function (applicantStage) {
          return ApplicantStageInterviewService.list(applicantStage, authorizationToken)
          .then(function (interviewers) {
            if (interviewers) {
              applicantStage.interview['dataValues'].interviewers = interviewers;
            }
          })
          .catch(function (err) {
            reject(err);
          })
        })
        .then(function () {
          resolve({
            applicant_stages: applicantStages,
            total_count: response.count
          });
        })
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  index: function (applicantID, query) {
    return new Promise(function (resolve, reject) {
      models.Applicant.findOne({
        where: {
          id: applicantID
        },
        attributes: ['job_id']
      })
      .then(function (response) {
        var parsedQuery = QueryParser.parse(models.Stage, query);
        if (response.job_id) {
          parsedQuery.where = {job_id: response.job_id};
          parsedQuery.include = [{model: models.Stage}];

          models.JobStage.findAndCountAll(parsedQuery)
          .then(function (jobStages) {
            var stages = [];
            jobStages = _.map(jobStages.rows, 'dataValues');
            _.each(jobStages, function (jobStage) {
              jobStage.Stage.precedence_number = jobStage.precedence_number;
              stages.push(jobStage.Stage)
            });
            resolve({stages: stages, total_count: stages.count});
          })
        }
        else {
          parsedQuery.where = {is_default: true};
          models.Stage.findAndCountAll(parsedQuery)
          .then(function (stages) {
            resolve({stages: stages.rows, total_count: stages.count});
          })
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (applicantID, stageParam, authorizationToken) {
    var stageID = stageParam.id;
    delete stageParam.id;
    var applicantStageID;

    return new Promise(function (resolve, reject) {
      verifyJobStage(applicantID, stageID)
      .then(function (isVerifiedJobStage) {
        if (!isVerifiedJobStage) {
          reject(new Error("Applicant can't be processed by the provided stage"));
        }
        else {
          timelineTerminated(applicantID)
          .then(function (isTimelineTerminated) {
            if (isTimelineTerminated) {
              reject(new Error('Timeline of the provided applicant is closed.'));
            }
            else {
              nonRepeatableStageAlreadyDefined(applicantID, stageID)
              .then(function (isNonRepeatableStageAlreadyDefined) {
                if (isNonRepeatableStageAlreadyDefined) {
                  reject(new Error('Applicant had already been assigned to provided stage.'));
                }
                else {
                  return models.sequelize.transaction()
                  .then(function (t) {
                    return models.ApplicantStage.create({
                      applicant_id: applicantID,
                      stage_id: stageID
                    }, {transaction: t})
                    .then(function (applicantStage) {
                      applicantStageID = applicantStage.id;
                      return Promise.join(
                      ApplicantStageInterviewService.create(applicantStageID, stageParam, stageID, authorizationToken, t),
                      ApplicantStageRemarkService.create(applicantStageID, stageParam.remark, t)
                      )
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
                    resolve({
                      "applicant_stage": {
                        "id": applicantStageID
                      }
                    });
                  })
                  .catch(function (err) {
                    reject(err);
                  });
                }
              });
            }
          });
        }
      });
    });
  }
};

function verifyJobStage(applicantID, stageID) {
  return new Promise(function (resolve, reject) {
    models.Applicant.find({
      where: {id: applicantID}
    })
    .then(function (applicant) {
      if (applicant.job_id) {
        models.JobStage.count({
          where: {stage_id: stageID, job_id: applicant.job_id}
        })
        .then(function (count) {
          resolve(count);
        })
      }
      else {
        models.Stage.count({where: {id: stageID, is_default: true}})
        .then(function (count) {
          resolve(count);
        })
      }
    })
    .catch(function (err) {
      reject(err)
    });
  });
}

function timelineTerminated(applicantID) {
  return new Promise(function (resolve, reject) {
    models.ApplicantStage.count({
      where: {applicant_id: applicantID},
      include: [{model: models.Stage, where: {is_termination: true}}]
    })
    .then(function (count) {
      resolve(count);
    })
    .catch(function (err) {
      reject(err)
    });
  });
}

function nonRepeatableStageAlreadyDefined(applicantID, stageID) {
  return new Promise(function (resolve, reject) {
    models.ApplicantStage.count({
      where: {stage_id: stageID, applicant_id: applicantID},
      include: [{model: models.Stage, where: {is_repeatable: false}}]
    })
    .then(function (count) {
      resolve(count);
    })
    .catch(function (err) {
      reject(err)
    });
  });
}

module.exports = ApplicantStageService;
