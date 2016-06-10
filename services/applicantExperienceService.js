"use strict";

var models = require('../models/index');

module.exports = {

  create: function (applicantID, experiences, t) {
    return models.sequelize.Promise.map(experiences, function (experience) {
      experience.applicant_id = applicantID;
      return models.ApplicantExperience.create(experience, {transaction: t});
    });
  }
};
