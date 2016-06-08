"use strict";

var models = require('../models/index');

module.exports = {

  create: function (applicantID, skills, t) {
    return models.sequelize.Promise.map(skills, function (skill) {
      return models.Skill.findOne({
        where: {
          name: skill
        }
      })
      .then(function (response) {
        return models.ApplicantSkill.create({
          applicant_id: applicantID,
          skill_id: response.id
        }, { transaction: t })
      })
    });
  }
};
