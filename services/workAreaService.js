"use strict";

var _ = require('lodash');

var models = require('../models/index');
var QueryParser = require('../helpers/queryParser');

module.exports = {

  search: function (query) {
    var parsedQuery = QueryParser.parse(models.Workarea, query);

    return new Promise(function (resolve, reject) {
      models.Workarea.findAll(parsedQuery)
      .then(function (workareas) {
        workareas = _.map(workareas, 'name');
        resolve(workareas);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

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
