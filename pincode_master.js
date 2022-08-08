'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pincode_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pincode_master.hasMany(models.city_masters, { foreignKey: 'id', sourceKey: 'city_id' });
    }
  };
  pincode_master.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    pincode: DataTypes.STRING,
    courier_type: DataTypes.STRING,
    city_id:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pincode_master',
    paranoid:true,
    timestamps:true
  });
  return pincode_master;
};