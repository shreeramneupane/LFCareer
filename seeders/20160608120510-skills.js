'use strict';

var models = require('../models/index');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var skills = [
      'Ruby on Rails',
      'Node.js',
      'AngularJS',
      'Angular2',
      'Java',
      'Python',
      'PHP',
      'JavaScript',
      'JQuery',
      'AJAX',
      'HTML',
      'CSS',
      'CSS3',
      'Responsive Design',
      'Android',
      'iOS'
    ];

    return Sequelize.Promise.map(skills, function (skill) {
      return models.Skill.findCreateFind({
        where: {
          name: skill
        }
      })
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('skills', null, {});
  }
};
