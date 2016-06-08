'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_educations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      degree: {
        allowNull: false,
        type: Sequelize.STRING
      },
      university: {
        allowNull: false,
        type: Sequelize.STRING
      },
      college: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passed_year: {
        type: Sequelize.INTEGER
      },
      grade: {
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
    return queryInterface.dropTable('applicant_educations');
  }
};
