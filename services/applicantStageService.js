"use strict";

var _ = require('lodash');
var models = require('../models/index');

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
  }
};
