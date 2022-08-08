'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rate_masters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      amount: {
        type: Sequelize.DOUBLE
      },      
      weight_type: {
        type: Sequelize.STRING
      },
      user_type: {
        type: Sequelize.STRING
      },
      from_weight: {
        type: Sequelize.INTEGER
      },
      to_weight: {
        type: Sequelize.INTEGER
      },
      from_distance: {
        type: Sequelize.DOUBLE
      },
      to_distance: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('rate_masters');
  }
};