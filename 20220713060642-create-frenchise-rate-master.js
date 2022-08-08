'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Frenchise_rate_masters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      delivery_type: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      amount_weight: {
        type: Sequelize.STRING
      },
      c_note_count: {
        type: Sequelize.STRING
      },
      amount_c_note: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Frenchise_rate_masters');
  }
};