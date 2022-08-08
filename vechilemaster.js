'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VechileMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // VechileMaster.belongsTo(models.documentmaster, { foreignKey: 'id', sourceKey: 'id' });
       VechileMaster.hasMany(models.bankdetails, { foreignKey: 'id', sourceKey: 'id' });
    }
  };
  VechileMaster.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    User_Id: DataTypes.STRING,
    VechileNo: DataTypes.STRING,
    Model: DataTypes.STRING,
    VechileType: DataTypes.STRING,
    IpAddress:DataTypes.STRING,
    IsActive:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'vechilemaster',
  });
  return VechileMaster;
};


