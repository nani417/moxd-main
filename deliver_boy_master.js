'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deliver_boy_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      deliver_boy_master.hasMany(models.documentmaster, { foreignKey: 'id', sourceKey: 'id' });
      deliver_boy_master.hasMany(models.vechilemaster, { foreignKey: 'id', sourceKey: 'id' });
      deliver_boy_master.hasMany(models.bankdetails, { foreignKey: 'id', sourceKey: 'id' });
      //deliver_boy_master.hasMany(models.order_transactions, { foreignKey: 'delivery_name', sourceKey: 'name' });
      deliver_boy_master.hasMany(models.Frenchise, { foreignKey: 'id', sourceKey: 'frenchise_id' });
    }
  }
  deliver_boy_master.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    commissionPer: DataTypes.STRING,
    frenchise_id: DataTypes.STRING,
    email: DataTypes.STRING,
    father_name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    languages: DataTypes.STRING,
    picture: DataTypes.STRING,
    otp: DataTypes.STRING,

    VechileType: DataTypes.STRING,
    Model: DataTypes.STRING,
    VechileNo: DataTypes.STRING,
    AccountNumber: DataTypes.STRING,
    AccountName: DataTypes.STRING,
    BankName: DataTypes.STRING,
    IFSC_Code: DataTypes.STRING,
    PanNumber: DataTypes.STRING,
    PanImage: DataTypes.STRING,
    LicenseNumber: DataTypes.STRING,
    LicenseImage: DataTypes.STRING,
    AadharNo: DataTypes.STRING,
    AadharImageFront: DataTypes.STRING,
    AadharImageBack: DataTypes.STRING,
    delivery_confirmation_otp: DataTypes.STRING,
    order_confirmation_otp:DataTypes.STRING,
    fcm_token:DataTypes.STRING    
  }, {
    sequelize,
    modelName: 'deliver_boy_master',
    paranoid:true,
    timestamps:true
  });
  return deliver_boy_master;
};

