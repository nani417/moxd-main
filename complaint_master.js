'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complaint_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  complaint_master.init({
    FrenchiseFrom: DataTypes.STRING,
    FrenchiseTo: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    complaint_message: DataTypes.STRING,
    c_note: DataTypes.STRING,
    tracking_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'complaint_master',
  });
  return complaint_master;
};