'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.addColumn(
      'stages',
      'is_default',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn(
      'stages',
      'is_repeatable',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn(
      'stages',
      'precedence_number',
      {
        type: Sequelize.INTEGER
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('stages', 'is_default'),
      queryInterface.removeColumn('stages', 'is_repeatable'),
      queryInterface.removeColumn('stages', 'precedence_number')
    ];
  }
};
