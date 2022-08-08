'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coupons', {      
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
      },
      coupon_title: {
        type: Sequelize.STRING
      },
      coupon_desc: {
        type: Sequelize.STRING
      },
      coupon_code: {
        type: Sequelize.STRING
      },
      starting_date: {
        type: Sequelize.STRING
      },
      ending_date: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      percentage: {
        type: Sequelize.DOUBLE
      },
      amount: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Coupons');
  }
};