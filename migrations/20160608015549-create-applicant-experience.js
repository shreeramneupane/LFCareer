'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_experiences', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      company_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      designation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      from_date: {
        type: Sequelize.DATE
      },
      to_date: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('applicant_experiences');
  }
};
