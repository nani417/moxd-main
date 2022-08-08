'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Coupon.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    coupon_title: DataTypes.STRING,
    coupon_desc: DataTypes.STRING,
    coupon_code: DataTypes.STRING,
    starting_date: DataTypes.STRING,
    ending_date: DataTypes.STRING,
    type: DataTypes.STRING,
    percentage: DataTypes.DOUBLE,
    amount: DataTypes.STRING,    
  }, {    
    sequelize,
    modelName: 'Coupon',
    paranoid:true,
    timestamps:true    
  });
  return Coupon;
};