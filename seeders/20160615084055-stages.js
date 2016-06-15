'use strict';

var models = require('../models/index');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var stageParams = [
      {name: 'Pending', is_default: true, is_repeatable: false, precedence_number: 1},
      {name: 'Shortlisted', is_default: true, is_repeatable: false, precedence_number: 2},
      {name: 'Phone Interview', is_default: true, is_repeatable: true, precedence_number: 3},
      {name: 'Face to Face Interview', is_default: true, is_repeatable: true, precedence_number: 4},
      {name: 'Hired', is_default: true, is_repeatable: false, precedence_number: 5},
      {name: 'Benched', is_default: true, is_repeatable: false, precedence_number: 6},
      {name: 'Rejected', is_default: true, is_repeatable: false, precedence_number: 7}
    ];

    return Sequelize.Promise.map(stageParams, function (stageParam) {
      return models.Stage.findCreateFind({
        where: stageParam
      })
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('stages', null, {});
  }
};
