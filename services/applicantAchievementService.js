"use strict";

var models = require('../models/index');

module.exports = {

  create: function (applicantID, achievements, t) {
    return models.sequelize.Promise.map(achievements, function (achievement) {
      achievement.applicant_id = applicantID;
      return models.ApplicantAchievement.create(achievement, {transaction: t});
    });
  }
};
