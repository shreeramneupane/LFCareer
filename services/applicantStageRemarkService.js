"use strict";

var models = require('../models/index');

module.exports = {

  create: function (applicantStageID, remark, t) {
    if (remark) {
      return models.ApplicantStageRemark.create({
        applicant_stage_id: applicantStageID,
        remark: remark
      }, {transaction: t})
    }
  }
};
