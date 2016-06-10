'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_documents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      resume: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profile_picture: {
        allowNull: false,
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
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('applicant_documents');
  }
};
