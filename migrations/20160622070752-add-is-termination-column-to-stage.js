'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.addColumn(
      'stages',
      'is_termination',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('stages', 'is_termination')
    ];
  }
};
