'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VechileMasters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      User_Id: {
        type: Sequelize.STRING
      },
      VechileNo: {
        type: Sequelize.STRING
      },
      Model: {
        type: Sequelize.STRING
      },
      VechileType: {
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
    await queryInterface.dropTable('VechileMasters');
  }
};