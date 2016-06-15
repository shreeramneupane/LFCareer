'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('job_stages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      job_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'jobs', key: 'id'}
      },
      stage_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'stages', key: 'id'}
      },
      precedence_number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      is_active: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('job_stages');
  }
};
