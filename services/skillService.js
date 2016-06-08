"use strict";

var models = require('../models/index');

module.exports = {
  
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
