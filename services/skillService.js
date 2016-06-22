"use strict";

var _ = require('lodash');

var models = require('../models/index');
var QueryParser = require('../helpers/queryParser');

module.exports = {

  search: function (query) {
    var parsedQuery = QueryParser.parse(models.Skill, query);

    return new Promise(function (resolve, reject) {
      models.Skill.findAll(parsedQuery)
      .then(function (skills) {
        skills = _.map(skills, 'name');
        resolve(skills);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  confirmSkillPresence: function (skills) {
    return models.sequelize.Promise.map(skills, function (skill) {
      return models.Skill.findOrCreate({
        where: {
          name: skill
        }
      })
    })
  }
};
