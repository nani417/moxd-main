'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    Name: DataTypes.STRING,
    MobileNumber: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    OTP: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    IpAddress:DataTypes.STRING,
    IsActive:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'users',
  });
  return Users;
};