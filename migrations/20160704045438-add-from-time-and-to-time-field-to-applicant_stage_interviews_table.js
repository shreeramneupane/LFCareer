'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.addColumn(
      'applicant_stage_interviews',
      'from_time',
      {
        type: Sequelize.TIME,
        allowNull: false
      }),
      queryInterface.addColumn(
      'applicant_stage_interviews',
      'to_time',
      {
        type: Sequelize.TIME
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('applicant_stage_interviews', 'from_time'),
      queryInterface.removeColumn('applicant_stage_interviews', 'to_time')
    ];
  }
};
