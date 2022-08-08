'use strict';
const {
  Model
} = require('sequelize');
const user = require('../models/users')
module.exports = (sequelize, DataTypes) => {
  class order_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order_transaction.hasMany(models.users, { foreignKey: 'id', sourceKey: 'user_id' });
      order_transaction.hasMany(models.OGM, { foreignKey: 'c_node_no', sourceKey: 'c_node_no' });
      order_transaction.hasMany(models.Frenchise, { foreignKey: 'id', sourceKey: 'frenchise_id' });
      order_transaction.hasMany(models.assign_deliveryboy, { foreignKey: 'c_note_no', sourceKey: 'c_node_no' });
      order_transaction.hasMany(models.c_note, { foreignKey: 'frenchise_id', sourceKey: 'frenchise_id' });
      //order_transaction.hasMany(models.deliver_boy_master, { foreignKey: 'name', sourceKey: 'delivery_name' });
      //order_transaction.hasMany(models.assign_deliveryboy, { foreignKey: 'delivery_status', sourceKey: 'delivery_status' });

      // define association here
    }
  };
  order_transaction.init({
    weight: DataTypes.DOUBLE,
    amount: DataTypes.DOUBLE,
    tax_amt: DataTypes.DOUBLE,
    gst_amt: DataTypes.DOUBLE,
    insurance_amt: DataTypes.DOUBLE,
    total_amount: DataTypes.DOUBLE,
    booking_type: DataTypes.STRING,
    service_type: DataTypes.STRING,
    schedule_type: DataTypes.STRING,
    payment_mode: DataTypes.STRING,
    booking_mode: DataTypes.STRING,
    frenchise_id: DataTypes.STRING,
    trans_frenchise_id: DataTypes.STRING,
    priority: DataTypes.BOOLEAN,
    otp: DataTypes.STRING,
    user_id: DataTypes.UUID,
    address_id_to: DataTypes.INTEGER,
    address_id_from: DataTypes.INTEGER,
    c_note: DataTypes.STRING,
    schedule_date: DataTypes.STRING,
    package_type: DataTypes.STRING,
    package_for: DataTypes.STRING,
    package_value: DataTypes.INTEGER,
    schedule_time_to: DataTypes.STRING,
    schedule_time_from: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    secure_shipment: DataTypes.BOOLEAN,
    pickup_name: DataTypes.STRING,
    c_node_no: DataTypes.STRING,
    pickup_mobile: DataTypes.STRING,
    pickup_address: DataTypes.STRING,
    pickup_state: DataTypes.STRING,
    pickup_district: DataTypes.STRING,
    pickup_pincode: DataTypes.STRING,
    delivery_name: DataTypes.STRING,
    delivery_mobile: DataTypes.STRING,
    delivery_address: DataTypes.STRING,
    delivery_state: DataTypes.STRING,
    delivery_district: DataTypes.STRING,
    delivery_pincode: DataTypes.STRING,
    delivery_status: DataTypes.STRING,
    pickup_status: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN,
    order_id: DataTypes.STRING,
    wallet_deduct: DataTypes.STRING,
    transaction_id: DataTypes.STRING,
    pickup_date: DataTypes.DATE,
    remarks: DataTypes.STRING,
    gst_no: DataTypes.STRING,
    no_pcs: DataTypes.STRING,
    order_confirmation_otp: DataTypes.STRING,
    coupon_code: DataTypes.STRING,
    coupon_type: DataTypes.BOOLEAN,
    coupon_amount: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'order_transactions',
  });
  return order_transaction;
};