'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Frenchises', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      ContactPersion: {
        type: Sequelize.STRING
      },
      MobileNumber: {
        type: Sequelize.STRING
      },
      Hash: {
        type: Sequelize.TEXT
      },
      Salt: {
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      District: {
        type: Sequelize.STRING
      },
      Pincode: {
        type: Sequelize.INTEGER
      },
      Lat: {
        type: Sequelize.DOUBLE
      },
      Lang: {
        type: Sequelize.DOUBLE
      },
      Bank_id: {
        type: Sequelize.STRING
      },
      BusinessName: {
        type: Sequelize.STRING
      },
      GST: {
        type: Sequelize.STRING
      },
      Document_Id: {
        type: Sequelize.STRING
      },
      Vechile_Id: {
        type: Sequelize.INTEGER
      },
      RegisterType: {
        type: Sequelize.STRING
      },
      Register_With: {
        type: Sequelize.STRING
      },
      ApprovedBy: {
        type: Sequelize.STRING
      },
      ApprovedStatus: {
        type: Sequelize.BOOLEAN
      },
      Description: {
        type: Sequelize.STRING
      },
      Language: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.STRING
      },
      Hub_id: {
        type: Sequelize.STRING
      },
      Hub_type: {
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
    await queryInterface.dropTable('Frenchises');
  }
};