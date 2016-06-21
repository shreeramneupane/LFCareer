"use strict";

var models = require('../models/index');

module.exports = {

  createDefault: function (applicantID, t) {
    return models.Stage.min('precedence_number')
    .then(function (minPrecedenceNumber) {
      return models.Stage.findOne({
        where: {
          precedence_number: minPrecedenceNumber
        }
      })
    })
    .then(function (stage) {
      return models.ApplicantStage.create({
        applicant_id: applicantID,
        stage_id: stage.id
      }, {transaction: t})
    })
  }
};
