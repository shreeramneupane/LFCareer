'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_references', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      designation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organization: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      relationship: {
        type: Sequelize.STRING
      },
      applicant_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'applicants', key: 'id'}
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('applicant_references');
  }
};
