'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applicants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      cover_letter: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING
      },
      source_description: {
        type: Sequelize.STRING
      },
      notification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      hobbies: {
        type: Sequelize.STRING
      },
      job_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: { model: 'jobs', key: 'id' }
      },
      direct_apply: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    return queryInterface.dropTable('applicants');
  }
};
