"use strict";

var models = require('../models/index');
var env = process.env.NODE_ENV || 'development';
var HttpStatus = require('http-status-codes');
var request = require('request');
var fileName = "../secret-config.json";
var Promise = require('bluebird');

var config = require(fileName)[env];

var ApplicantStageInterviewService = {

  list: function (applicantStage, authorizationToken) {
    return new Promise(function (resolve, reject) {
      if (applicantStage.interview) {
        var interviewerURL = config['vyaguta_employee_detail_url'];
        var interviewers = [];
        var interviewersID = applicantStage.interview.interviewers_id.split(',');
        Promise.map(interviewersID, function (interviewerID) {
          interviewerURL = interviewerURL.replace(':id', interviewerID);

          var name = null;
          return new Promise(function (resolveInner, rejectInner) {
            return request({
              url: interviewerURL,
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationToken
              }
            }, function (err, response) {
              if (!err && response.statusCode == HttpStatus.OK) {
                var interviewerDetail = JSON.parse(response.body);
                name = interviewerDetail.firstName + ' ' + interviewerDetail.lastName;
                resolveInner(name);
              }
              else {
                rejectInner(new Error("Can't retrieve Interviewer details."))
              }
            })
          })
          .then(function (interviewerName) {
            interviewers.push(interviewerName);
          })
        })
        .then(function () {
          resolve(interviewers);
        })
        .catch(function (err) {
          reject(err);
        })
      }
      else {
        resolve(false);
      }
    });
  },

  create: function (applicantStageID, stageParam, stageID, authorizationToken, t) {
    if (stageParam.interview) {
      return ApplicantStageInterviewService.verifyInterviewStage(stageID)
      .then(function () {
        return ApplicantStageInterviewService.validateInterviewers(authorizationToken, stageParam.interview.interviewers_id)
        .then(function () {
          return models.ApplicantStageInterview.create({
            schedule: stageParam.interview.schedule,
            meeting_room: stageParam.interview.meeting_room,
            interviewers_id: stageParam.interview.interviewers_id.toString(),
            applicant_stage_id: applicantStageID
          }, {transaction: t})
        })
      });
    }
  },

  update: function (applicantStageInterviewID, applicantStageInterviewParam) {
    return new Promise(function (resolve, reject) {
      models.ApplicantStageInterview.find({
        where: {
          id: applicantStageInterviewID
        }
      })
      .then(function (applicantStageInterview) {
        if (applicantStageInterview) {
          applicantStageInterview.updateAttributes({
            schedule: applicantStageInterviewParam.schedule,
            meeting_room: applicantStageInterviewParam.meeting_room,
            interviewers_id: applicantStageInterviewParam.interviewers_id.toString(),
          })
          .then(function (response) {
            resolve({applicant_stage_interview: response});
          });
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  verifyInterviewStage: function (stageId) {
    return new Promise(function (resolve, reject) {
      return models.Stage.findOne({
        where: {
          id: stageId,
          is_interview: true
        }
      })
      .then(function (interviewStage) {
        if (!interviewStage) {
          reject(new Error('Requested stage is not an interview stage.'));
        }
        else {
          resolve(true);
        }
      })
    })
  }
  ,

  validateInterviewers: function (authorizationToken, interviewersID) {
    var interviewerValidationURL = config['vyaguta_employee_detail_url'];

    return new Promise(function (resolve, reject) {
      return models.sequelize.Promise.map(interviewersID, function (interviewerID) {
        interviewerValidationURL = interviewerValidationURL.replace(':id', interviewerID);
        return request({
          url: interviewerValidationURL,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationToken
          }
        }, function (err, response) {
          if (err || response.statusCode !== HttpStatus.OK || JSON.parse(response.body).hrStatus.title !== config['vyaguta_employee_valid_hrStatus']) {
            reject(new Error('Interviewer can not be validated.'));
          }
          else {
            resolve(true);
          }
        });
      })
    });
  }
};

module.exports = ApplicantStageInterviewService;
