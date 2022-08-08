'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      user_id: {
        type: Sequelize.UUID,
      },
      package_for: {
        type: Sequelize.STRING,
      },
      address_id_to: {
        type: Sequelize.INTEGER,
      },
      address_id_from: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      tax_amt: {
        type: Sequelize.DOUBLE
      },
      gst_amt: {
        type: Sequelize.DOUBLE
      },
      insurance_amt: {
        type: Sequelize.DOUBLE
      },
      total_amount: {
        type: Sequelize.DOUBLE
      },
      package_type: {
        type: Sequelize.STRING
      },
      package_value: {
        type: Sequelize.INTEGER
      },
      booking_type: {
        type: Sequelize.STRING
      },
      service_type: {
        type: Sequelize.STRING
      },
      schedule_type: {
        type: Sequelize.STRING
      },
      schedule_time_to: {
        type: Sequelize.STRING
      },
      schedule_time_from: {
        type: Sequelize.STRING
      },
      payment_mode: {
        type: Sequelize.STRING
      },
      payment_status: {
        type: Sequelize.STRING
      },
      booking_mode: {
        type: Sequelize.STRING
      },
      frenchise_id: {
        type: Sequelize.STRING
      },
      trans_frenchise_id: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.BOOLEAN
      },
      otp: {
        type: Sequelize.STRING
      },
      c_note: {
        type: Sequelize.STRING
      },
      schedule_date: {
        type: Sequelize.STRING
      },
      pickup_name: {
        type: Sequelize.STRING
      },
      pickup_mobile: {
        type: Sequelize.STRING
      },
      pickup_address: {
        type: Sequelize.STRING
      },
      pickup_state: {
        type: Sequelize.STRING
      },
      pickup_district: {
        type: Sequelize.STRING
      },
      pickup_pincode: {
        type: Sequelize.STRING
      },
      delivery_name: {
        type: Sequelize.STRING
      },
      delivery_mobile: {
        type: Sequelize.STRING
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      delivery_state: {
        type: Sequelize.STRING
      },
      delivery_district: {
        type: Sequelize.STRING
      },
      delivery_pincode: {
        type: Sequelize.STRING
      },
      delivery_status: {
        type: Sequelize.STRING
      },
      c_node_no: {
        type: Sequelize.STRING
      },
      pickup_status: {
        type: Sequelize.STRING
      },
      IpAddress: {
        type: Sequelize.STRING
      },
      order_id: {
        type: Sequelize.STRING
      },
      wallet_deduct: {
        type: Sequelize.STRING
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      IsActive: {
        type: Sequelize.BOOLEAN
      },
      secure_shipment: {
        type: Sequelize.BOOLEAN
      },
      pickup_date:{
        type: Sequelize.DATE
      },
      remarks:{
        type: Sequelize.STRING
      },
      weight_kgs:{
        type: Sequelize.STRING
      },
      weight_gms:{
        type: Sequelize.STRING
      },
      gst_no:{
        type: Sequelize.STRING
      },
      no_pcs:{
        type: Sequelize.STRING
      },
      order_confirmation_otp:{
        type: Sequelize.STRING
      },
      coupon_code:{
        type: Sequelize.STRING
      },
      coupon_type:{
        type: Sequelize.BOOLEAN
      },
      coupon_amount:{
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
  // up: function (queryInterface, Sequelize) {
  //   return Promise.all([
  //     queryInterface.addColumn(
  //       'Users',
  //       'age',
  //       Sequelize.STRING
  //     )
  //   ]);
  // },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_transactions');
  }
};