'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DocumentMaster.hasMany(models.vechilemaster, { foreignKey: 'id', sourceKey: 'id' });
      DocumentMaster.hasMany(models.bankdetails, { foreignKey: 'id', sourceKey: 'id' });

    }
  };
  DocumentMaster.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    User_Id: DataTypes.STRING,
    PanNumber: DataTypes.STRING,
    PanImage: DataTypes.STRING,
    LicenseNumber: DataTypes.STRING,
    LicenseImage: DataTypes.STRING,
    AadharNo: DataTypes.STRING,
    AadharImageFront: DataTypes.STRING,
    AadharImageBack: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive:DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'documentmaster',
  });
  return DocumentMaster;
};


