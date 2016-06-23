"use strict";

var _ = require('lodash');
var models = require('../models/index');

var ApplicantStageRemarkService = require('../services/applicantStageRemarkService');
var QueryParser = require('../helpers/queryParser');

module.exports = {

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

  timeline: function (applicantID) {
    return new Promise(function (resolve, reject) {
      models.ApplicantStage.findAndCountAll({
        where: {
          applicant_id: applicantID
        },
        include: [
          {model: models.Stage}
        ]
      })
      .then(function (response) {
        var applicantStages = _.map(response.rows, 'dataValues');
        _.each(applicantStages, function (applicantStage) {
          applicantStage.stage = applicantStage.Stage;
          delete applicantStage.Stage;
        });
        resolve({
          applicant_stages: applicantStages,
          total_count: response.count
        });
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
            var jobStages = _.map(jobStages.rows, 'dataValues');
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

  create: function (applicantID, stageParam) {
    var stageID = stageParam.id;
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
              .then(function (isnonRepeatableStageAlreadyDefined) {
                if (isnonRepeatableStageAlreadyDefined) {
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
                      var applicantStageID = applicantStage.id;
                      return ApplicantStageRemarkService.create(applicantStageID, stageParam.remark, t)
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
                    resolve({applicant: {id: applicantID}});
                  })
                  .catch(function (err) {
                    reject(err);
                  });
                }
              })
            }
          })
        }
      })
    });
  }
};

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
