'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.addColumn(
      'jobs',
      'concern_people',
      {
        type: Sequelize.STRING
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('jobs', 'concern_people')
    ];
  }
};
