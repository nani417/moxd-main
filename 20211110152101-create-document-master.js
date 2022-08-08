'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DocumentMasters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      User_Id: {
        type: Sequelize.STRING
      },
      PanNumber: {
        type: Sequelize.STRING
      },
      PanImage: {
        type: Sequelize.STRING
      },
      LicenseNumber: {
        type: Sequelize.STRING
      },
      LicenseImage: {
        type: Sequelize.STRING
      },
      AadharNo: {
        type: Sequelize.STRING
      },
      AadharImageFront: {
        type: Sequelize.STRING
      },
      AadharImageBack: {
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
    await queryInterface.dropTable('DocumentMasters');
  }
};