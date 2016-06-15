'use strict';

var models = require('../models/index');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var stageParams = [
      {
        title: 'Pending',
        is_default: true,
        is_repeatable: false,
        precedence_number: 1
      },
      {
        title: 'Shortlisted',
        is_default: true,
        is_repeatable: false,
        precedence_number: 2
      },
      {
        title: 'Phone Interview',
        is_default: true,
        is_repeatable: true,
        precedence_number: 3
      },
      {
        title: 'Face to Face Interview',
        is_default: true,
        is_repeatable: true,
        precedence_number: 4
      },
      {
        title: 'Hired',
        is_default: true,
        is_repeatable: false,
        precedence_number: 5
      },
      {
        title: 'Benched',
        is_default: true,
        is_repeatable: false,
        precedence_number: 6
      },
      {
        title: 'Rejected',
        is_default: true,
        is_repeatable: false,
        precedence_number: 7
      }
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