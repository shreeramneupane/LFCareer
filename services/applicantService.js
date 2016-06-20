"use strict";

var _ = require('lodash');
var moment = require('moment');
var Promise = require("bluebird");

var models = require('../models/index');

var QueryParser = require('../helpers/queryParser');

var ApplicantAchievementService = require('../services/applicantAchievementService');
var ApplicantEducationService = require('../services/applicantEducationService');
var ApplicantExperienceService = require('../services/applicantExperienceService');
var ApplicantPortfolioService = require('../services/applicantPortfolioService');
var ApplicantSkillService = require('../services/applicantSkillService');
var ApplicantStageService = require('../services/applicantStageService');
var ApplicantReferenceService = require('../services/applicantReferenceService');
var SkillService = require('../services/skillService');
var WorkareaService = require('../services/workAreaService');

var ApplicantService = {
  list: function (query) {
    var parsedQuery = QueryParser.parse(models.Stage, query);
    parsedQuery.include = [{model: models.Job}];
    return new Promise(function (resolve, reject) {
      models.Applicant.findAndCountAll(parsedQuery)
      .then(function (response) {
        var applicants = _.map(response.rows, 'dataValues');
        _.each(applicants, function (applicant) {
          applicant.job = null;
          if (applicant.Job) {
            applicant.job = applicant.Job.title;
          }
          delete applicant.Job;
        });
        resolve({applicants: applicants, total_count: response.count});
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
          {model: models.Job},
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
        applicantParam.job = applicant.Job;
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
        applicantParam = _.omit(applicantParam, 'Job', 'ApplicantAchievements', 'ApplicantEducations', 'ApplicantExperiences', 'ApplicantReferences', 'Skills', 'ApplicantPortfolios');

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
      try {
        applicantParam.total_experience = totalExperience(applicantParam['experiences']);
      }
      catch (e) {
        reject(new Error('Please fill up experience field with all detail.'))
      }
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
    ApplicantSkillService.create(applicantID, applicantParam['skills'], t),
    ApplicantStageService.createDefault(applicantID, t)
    );
  },

  update: function (id, applicantParam) {
    return new Promise(function (resolve, reject) {
      models.Applicant.find({
        where: {
          id: id
        }
      })
      .then(function (applicant) {
        if (applicant) {
          applicant.updateAttributes(applicantParam)
          .then(function (response) {
            resolve({applicant: response});
          });
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};

module.exports = ApplicantService;

function totalExperience(experiences) {
  var total = 0;

  experiences.forEach(function (experience) {
    try {
      var start = moment(new Date(experience.to_date));
      var end = moment(new Date(experience.from_date));
    }
    catch (e) {
      throw e;
    }

    var diff = start.diff(end, "years", true);
    total = total + diff;
  });

  return (Math.floor(total) + " years " + Math.floor(12 * (total % 1)) + " months " + Math.floor(30 * ((12 * (total % 1)) % 1)) + " days");
}
