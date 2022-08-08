'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddressMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AddressMaster.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    User_Id: DataTypes.STRING,
    Name: DataTypes.STRING,
    Address1: DataTypes.STRING,
    Address2: DataTypes.STRING,
    MobileNumber: DataTypes.STRING,
    State: DataTypes.STRING,
    District: DataTypes.STRING,
    Pincode: DataTypes.STRING,
    AddressType: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'address_master',
  });
  return AddressMaster;
};