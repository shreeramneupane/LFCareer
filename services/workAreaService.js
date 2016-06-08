"use strict";

var models = require('../models/index');

module.exports = {

  confirmWorkareaPresence: function (portfolios) {
    return models.sequelize.Promise.map(portfolios, function (portfolio) {
      return models.sequelize.Promise.map(portfolio.workareas, function (workarea) {
        return models.Workarea.findOrCreate({
          where: {
            name: workarea
          }
        });
      });
    });
  }
};
