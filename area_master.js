'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class area_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      area_master.hasMany(models.city_masters,{ foreignKey: 'id', sourceKey: 'city_id' });
      area_master.hasMany(models.pincode_master,{ foreignKey: 'id', sourceKey: 'pincode_id' });

    }
  };
  area_master.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    city_id: DataTypes.STRING,
    area_name: DataTypes.STRING,
    pincode_id: DataTypes.STRING,
    product_service: DataTypes.STRING,
    service_type: DataTypes.JSON,
    service_days: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    remarks: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'area_master',
    paranoid:true,
    timestamps:true
  });
  return area_master;
};