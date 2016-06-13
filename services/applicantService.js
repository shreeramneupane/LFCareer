"use strict";

var _ = require('lodash');
var Promise = require("bluebird");

var models = require('../models/index');

var QueryParser = require('../helpers/queryParser');

var ApplicantAchievementService = require('../services/applicantAchievementService');
var ApplicantEducationService = require('../services/applicantEducationService');
var ApplicantExperienceService = require('../services/applicantExperienceService');
var ApplicantPortfolioService = require('../services/applicantPortfolioService');
var ApplicantSkillService = require('../services/applicantSkillService');
var ApplicantReferenceService = require('../services/applicantReferenceService');
var SkillService = require('../services/skillService');
var WorkareaService = require('../services/workAreaService');

var ApplicantService = {
  list: function (query) {
    var parsedQuery = QueryParser.parse(models.Stage, query);

    return new Promise(function (resolve, reject) {
      models.Applicant.findAndCountAll(parsedQuery)
      .then(function (response) {
        resolve({applicants: response.rows, total_count: response.count});
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
        applicantParam = _.omit(applicantParam, 'ApplicantAchievements', 'ApplicantEducations', 'ApplicantExperiences', 'ApplicantReferences', 'Skills', 'ApplicantPortfolios');

        resolve({applicant: applicantParam});
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
