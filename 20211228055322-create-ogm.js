'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OGMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_node_no: {
        type: Sequelize.UUID
      },
      OGM_no: {
        type: Sequelize.UUID
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      source_franchise_id: {
        type: Sequelize.UUID
      },
      frenchise_id: {
        type: Sequelize.UUID
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('OGMs');
  }
};