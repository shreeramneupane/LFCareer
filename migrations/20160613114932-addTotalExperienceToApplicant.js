'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
    'applicants',
    'total_experience',
    {
      allowNull: false,
      type: Sequelize.STRING
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('applicants', 'total_experience')
  }
};
