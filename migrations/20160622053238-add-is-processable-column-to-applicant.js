'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.addColumn(
      'applicants',
      'is_processable',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('applicants', 'is_processable')
    ];
  }
};
