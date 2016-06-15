'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      intro: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      number_of_opening: {
        type: Sequelize.INTEGER
      },
      valid_until: {
        allowNull: false,
        type: Sequelize.DATE
      },
      closed_on: {
        type: Sequelize.DATE
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      specification: {
        type: Sequelize.TEXT
      },
      position_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'positions', key: 'id' }
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
    return queryInterface.dropTable('jobs');
  }
};
