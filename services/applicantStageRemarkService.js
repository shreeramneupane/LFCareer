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
  },

  add: function (applicantStageID, remark) {
    return new Promise(function (resolve, reject) {
      models.ApplicantStageRemark.findOne({
        where: {
          applicant_stage_id: applicantStageID
        }
      })
      .then(function (applicantStageReview) {
        if (applicantStageReview) {
          return models.ApplicantStageRemark.update({remark: remark}, {
            where: {
              applicant_stage_id: applicantStageID
            }
          })
          .then(function () {
            return models.ApplicantStageRemark.findOne({
              where: {
                applicant_stage_id: applicantStageID
              }
            })
          });
        }
        else {
          return models.ApplicantStageRemark.create({
            applicant_stage_id: applicantStageID,
            remark: remark
          });
        }
      })
      .then(function (response) {
        resolve({remark: response})
      })
      .catch(function (err) {
        reject(err);
      })
    });
  }
};
