'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('area_masters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,   
      },
      city_id: {
        type: Sequelize.STRING
      },
      area_name: {
        type: Sequelize.STRING
      },
      pincode_id: {
        type: Sequelize.STRING
      },
      product_service: {
        type: Sequelize.STRING
      },
      service_type: {
        type: Sequelize.JSON
      },
      service_days: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      remarks: {
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
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('area_masters');
  }
};