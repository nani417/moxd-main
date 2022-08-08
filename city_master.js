'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //city_master.belongsTo(models.Frenchise, { foreignKey: 'id', targetKey: 'city_id' });
      city_master.hasMany(models.Frenchise, { foreignKey: 'city_id', sourceKey: 'id' });
    }
  };
  city_master.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    city_name: DataTypes.STRING,
    regional_id: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'city_masters',
    paranoid:true,
    timestamps:true
  });
  return city_master;
};