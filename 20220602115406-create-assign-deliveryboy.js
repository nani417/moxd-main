'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assign_deliveryboys', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
      },
      drs_no: {
        type: Sequelize.STRING
      },
      date_time: {
        type: Sequelize.DATE
      },
      delivery_boy_id: {
        type: Sequelize.UUID
      },
      area_id: {
        type: Sequelize.UUID
      },
      c_note_no: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      no_pcs: {
        type: Sequelize.INTEGER
      },
      receiver_name: {
        type: Sequelize.STRING
      },
      receiver_mobile: {
        type: Sequelize.STRING
      },
      franchise_id: {
        type: Sequelize.STRING
      },
      delivery_status: {
        type: Sequelize.STRING
      },
      receipt_img_url:{
        type: Sequelize.STRING
      },
      pod_image:{
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('assign_deliveryboys');
  }
};