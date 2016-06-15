'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.addColumn(
      'stages',
      'default',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn(
      'stages',
      'repeatable',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn(
      'stages',
      'order',
      {
        type: Sequelize.INTEGER
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('stages', 'default'),
      queryInterface.removeColumn('stages', 'repeatable'),
      queryInterface.removeColumn('stages', 'order')
    ];
  }
};
