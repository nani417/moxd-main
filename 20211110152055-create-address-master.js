'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AddressMasters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      User_Id: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Address1: {
        type: Sequelize.STRING
      },
      Address2: {
        type: Sequelize.STRING
      },
      MobileNumber: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      District: {
        type: Sequelize.STRING
      },
      Pincode: {
        type: Sequelize.STRING
      },
      AddressType: {
        type: Sequelize.STRING
      },
      IpAddress: {
        type: Sequelize.STRING
      },
      IsActive: {
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
    await queryInterface.dropTable('AddressMasters');
  }
};