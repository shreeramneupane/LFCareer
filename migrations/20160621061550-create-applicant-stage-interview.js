'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_stage_interviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      schedule: {
        allowNull: false,
        type: Sequelize.DATE
      },
      meeting_room: {
        type: Sequelize.STRING
      },
      interviewer_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      applicant_stage_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'applicant_stages', key: 'id'}
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
    return queryInterface.dropTable('applicant_stage_interviews');
  }
};
