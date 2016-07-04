"use strict";

var models = require('../models/index');
var env = process.env.NODE_ENV || 'development';
var HttpStatus = require('http-status-codes');
var request = require('request');
var fileName = "../secret-config.json";
var Promise = require('bluebird');

var config = require(fileName)[env];
var Regex = require('../config/regex');

var ApplicantStageInterviewService = {

  create: function (applicantStageID, applicantStageInterviewParam, stageID, t) {
    if (applicantStageInterviewParam) {
      return ApplicantStageInterviewService.verifyInterviewStage(stageID)
      .then(function () {
        return ApplicantStageInterviewService.validateInterviewers(applicantStageInterviewParam.interviewers_email)
        .then(function () {
          return models.ApplicantStageInterview.create({
            schedule: applicantStageInterviewParam.schedule,
            meeting_room: applicantStageInterviewParam.meeting_room,
            interviewers_email: applicantStageInterviewParam.interviewers_email.toString(),
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
        return ApplicantStageInterviewService.validateInterviewers(applicantStageInterviewParam.interviewers_email)
        .then(function () {
          if (applicantStageInterview) {
            return applicantStageInterview.updateAttributes({
              schedule: applicantStageInterviewParam.schedule,
              meeting_room: applicantStageInterviewParam.meeting_room,
              interviewers_email: applicantStageInterviewParam.interviewers_email.toString()
            })
            .then(function (response) {
              resolve({applicant_stage_interview: response});
            });
          }
        })
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
  },

  validateInterviewers: function (interviewersEmail) {
    return new Promise(function (resolve, reject) {
      return models.sequelize.Promise.map(interviewersEmail, function (interviewerEmail) {
        if (!Regex['email'].test(interviewerEmail)) {
          reject(new Error('Please provide valid email address of interviewers'));
        }
      })
      .then(function () {
        resolve(true);
      })
    });
  }
};

module.exports = ApplicantStageInterviewService;
