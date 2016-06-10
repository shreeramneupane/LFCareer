"use strict";

var models = require('../models/index');

module.exports = {
  
  create: function (applicantID, educations, t) {
    return models.sequelize.Promise.map(educations, function (education) {
      education.applicant_id = applicantID;
      return models.ApplicantEducation.create(education, {transaction: t});
    });
  }
};
