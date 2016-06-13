"use strict";

var _ = require('lodash');
var Promise = require("bluebird");

var config = require("../secret-config.json")[process.env.NODE_ENV || 'development'];
var applicantDocumentRootUrl = config['bucket_name'] + '.s3.amazonaws.com/';
var models = require('../models/index');

var ApplicantAchievementService = require('../services/applicantAchievementService');
var ApplicantEducationService = require('../services/applicantEducationService');
var ApplicantExperienceService = require('../services/applicantExperienceService');
var ApplicantPortfolioService = require('../services/applicantPortfolioService');
var ApplicantSkillService = require('../services/applicantSkillService');
var ApplicantReferenceService = require('../services/applicantReferenceService');
var SkillService = require('../services/skillService');
var WorkareaService = require('../services/workAreaService');

var ApplicantService = {
  list: function () {
    return new Promise(function (resolve, reject) {
      models.Applicant.findAll({})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    var applicantParam;
    return new Promise(function (resolve, reject) {
      models.Applicant.findOne({
        where: {
          id: id
        },
        include: [
          {model: models.ApplicantDocument},
          {model: models.ApplicantAchievement},
          {model: models.ApplicantEducation},
          {model: models.ApplicantExperience},
          {model: models.ApplicantReference},
          {model: models.Skill, through: models.ApplicantSkill},
          {
            model: models.ApplicantPortfolio,
            include: [{
              model: models.Workarea,
              through: models.ApplicantPortfolioWorkarea
            }]
          }
        ]
      })
      .then(function (applicant) {
        applicantParam = applicant.dataValues;
        applicantParam.resume = null;
        applicantParam.profile_picture = null;

        if (applicant.ApplicantDocument) {
          applicantParam.resume = applicantDocumentRootUrl + applicant.ApplicantDocument.resume;
          applicantParam.profile_picture = applicantDocumentRootUrl + applicant.ApplicantDocument.profile_picture;
        }

        applicantParam.achievements = applicant.ApplicantAchievements;
        applicantParam.educations = applicant.ApplicantEducations;
        applicantParam.experiences = applicant.ApplicantExperiences;
        applicantParam.references = applicant.ApplicantReferences;
        applicantParam.skills = _.map(applicant.Skills, 'name');
        applicantParam.portfolios = _.map(applicant.ApplicantPortfolios, 'dataValues');
        _.each(applicantParam.portfolios, function (portfolio) {
          portfolio.workareas = _.map(portfolio.Workareas, 'name');
          delete portfolio.Workareas;
        });
        applicantParam = _.omit(applicantParam, 'ApplicantDocument', 'ApplicantAchievements', 'ApplicantEducations', 'ApplicantExperiences', 'ApplicantReferences', 'Skills', 'ApplicantPortfolios');

        resolve(applicantParam);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (applicantParam) {
    var applicantID;

    if (applicantParam.job_id) {
      applicantParam.direct_apply = false;
    }

    return new Promise(function (resolve, reject) {

      return SkillService.confirmSkillPresence(applicantParam['skills'])
      .then(function () {
        return WorkareaService.confirmWorkareaPresence(applicantParam['portfolios'])
        .then(function () {
          return models.sequelize.transaction()
          .then(function (t) {
            return models.Applicant.create(applicantParam, {transaction: t})
            .then(function (applicant) {
              applicantID = applicant.id;
              return ApplicantService.createNestedRecords(applicantID, applicantParam, t)
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
        });
      });
    });
  },

  createNestedRecords: function (applicantID, applicantParam, t) {
    return Promise.join(
    ApplicantAchievementService.create(applicantID, applicantParam['achievements'], t),
    ApplicantEducationService.create(applicantID, applicantParam['educations'], t),
    ApplicantExperienceService.create(applicantID, applicantParam['experiences'], t),
    ApplicantPortfolioService.create(applicantID, applicantParam['portfolios'], t),
    ApplicantReferenceService.create(applicantID, applicantParam['references'], t),
    ApplicantSkillService.create(applicantID, applicantParam['skills'], t)
    );
  }
};

module.exports = ApplicantService;
