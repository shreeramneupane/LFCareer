"use strict";

var models = require('../models/index');

var ApplicantPortfolioService = require('../services/applicantPortfolioService');

module.exports = {

  create: function (applicantID, portfolios, t) {
    return models.sequelize.Promise.map(portfolios, function (portfolio) {
      portfolio.applicant_id = applicantID;
      return models.ApplicantPortfolio.create(portfolio, {transaction: t})
      .then(function (createdPortfolio) {
        return models.sequelize.Promise.map(portfolio.workareas, function (workarea) {
          return models.Workarea.findOne({
            where: {
              name: workarea
            }
          })
          .then(function (response) {
            return models.ApplicantPortfolioWorkarea.create({
              applicant_portfolio_id: createdPortfolio.id,
              workarea_id: response.id
            }, {transaction: t})
          })
        })
      })
    })
  }
};
