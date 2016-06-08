"use strict";

var models = require('../models/index');

module.exports = {

  create: function (applicantID, references, t) {
    return models.sequelize.Promise.map(references, function (reference) {
      reference.applicant_id = applicantID;
      return models.ApplicantReference.create(reference, {transaction: t});
    });
  }
};
