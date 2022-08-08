'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Frenchise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Frenchise.hasMany(models.role_mapping,{ foreignKey: 'role_id', sourceKey: 'Role_Id' });
      Frenchise.hasMany(models.role_master,{ foreignKey: 'id', sourceKey: 'Role_Id' });
      Frenchise.hasMany(models.regional,{ foreignKey: 'id', sourceKey: 'RegisterType' });
      Frenchise.hasMany(models.city_masters,{ foreignKey: 'id', sourceKey: 'city_id' });
      Frenchise.hasMany(models.c_note,{foreignKey:'frenchise_id',sourceKey:'id'})
      // define association here
    }
  };
  Frenchise.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    ContactPersion: DataTypes.STRING,
    MobileNumber: DataTypes.STRING,
    Hash: DataTypes.TEXT,
    Salt: DataTypes.STRING,
    Email: DataTypes.STRING,
    Address: DataTypes.STRING,
    State: DataTypes.STRING,
    District: DataTypes.STRING,
    Pincode: DataTypes.INTEGER,
    Lat: DataTypes.DOUBLE,
    Lang: DataTypes.DOUBLE,
    city_id:DataTypes.STRING,
    Bank_id: DataTypes.STRING,
    BusinessName: DataTypes.STRING,
    GST: DataTypes.STRING,
    Document_Id: DataTypes.STRING,
    Vechile_Id: DataTypes.STRING,
    RegisterType: DataTypes.STRING,
    Register_With: DataTypes.STRING,
    Role_Id: DataTypes.STRING,
    ApprovedBy: DataTypes.STRING,
    Hub_id: DataTypes.STRING,
    Hub_type: DataTypes.STRING,
    ApprovedStatus: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Description: DataTypes.STRING,
    Language: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Frenchise',
  });

  Frenchise.setPassword = function(password) {
    this.Salt = crypto.randomBytes(16).toString('hex');
    this.Hash = crypto.pbkdf2Sync(password, this.Salt, 100, 512, 'sha512').toString('hex');
  };
  
Frenchise.validatePassword = function(password,Salt,Hash) {
    console.log("Password DB :  "+password)
    console.log("Salt DB :  "+Salt)
    const hash = crypto.pbkdf2Sync(password, Salt, 100, 512, 'sha512').toString('hex');
    console.log("hash DB :  "+Hash)
    console.log("very hash  :  "+hash)
    
    return Hash === hash;
};

Frenchise.generateJWT = function(UserData) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
        MobileNumber: UserData.MobileNumber,
        Id: UserData.Id,
    }, 'moshimoshi@123#@!',{ expiresIn: '1h' });
}
  
Frenchise.toAuthJSON = function(UserData) {
    return {
        UserData,
        token: this.generateJWT(UserData),
    };
};


  return Frenchise;
};