'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drs_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  drs_data.init({
    drs_no: DataTypes.STRING,
    drs_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'drs_data',
  });
  return drs_data;
};