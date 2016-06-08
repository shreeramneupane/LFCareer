'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applicant_portfolio_workareas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      applicant_portfolio_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'applicant_portfolios', key: 'id'}
      },
      workarea_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {model: 'workareas', key: 'id'}
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
    return queryInterface.dropTable('applicant_portfolio_workareas');
  }
};
