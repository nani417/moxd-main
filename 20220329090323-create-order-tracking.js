'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_trackings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      frenchise_id_from: {
        type: Sequelize.UUID
      },
      frenchise_id_to: {
        type: Sequelize.UUID
      },
      frenchise_id_from_trans: {
        type: Sequelize.UUID
      },
      frenchise_id_to_trans: {
        type: Sequelize.UUID
      },
      order_status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
        default:"pending"
      },
      ogm_no: {
        type: Sequelize.STRING
      },
      total_count: {
        type: Sequelize.INTEGER
      },
      accept_count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_trackings');
  }
};