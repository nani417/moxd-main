'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  BankDetails.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    User_Id: DataTypes.STRING,
    AccountNumber: DataTypes.STRING,
    AccountName:DataTypes.STRING,
    BankName:DataTypes.STRING,
    IFSC_Code: DataTypes.STRING,
    IpAddress:DataTypes.STRING,
    IsActive:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'bankdetails',
  });
  return BankDetails;
};

