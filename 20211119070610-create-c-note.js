'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('c_notes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      frenchise_id: {
        type: Sequelize.STRING
      },
      start_no: {
        type: Sequelize.STRING
      },
      end_no: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      cash_mode: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      receive_date: {
        type: Sequelize.STRING
      },
      receive_amount: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      IpAddress: {
        type: Sequelize.STRING,
        defaultValue: "0.0.0.0"
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
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
    await queryInterface.dropTable('c_notes');
  }
};