'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_stages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      applicant_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'applicants', key: 'id'}
      },
      stage_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'stages', key: 'id'}
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('applicant_stages');
  }
};
