'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('adminwallets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,   
      },
      walletamount: {
        type: Sequelize.DOUBLE
      },
      type: {
        type: Sequelize.STRING
      },
      c_note_no: {
        type: Sequelize.STRING
      },
      frenchise_id: {
        type: Sequelize.STRING
      },
      trans_frenchiseid: {
        type: Sequelize.STRING
      },
      active_status: {
        type: Sequelize.BOOLEAN
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      debit_credit: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('adminwallets');
  }
};