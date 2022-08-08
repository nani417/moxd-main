'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adminwallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      adminwallet.hasMany(models.Frenchise,{foreignKey:'id',sourceKey:'frenchise_id'})
      adminwallet.hasMany(models.order_transactions,{foreignKey:'c_node_no',sourceKey:'c_note_no'})
    }
  };
  adminwallet.init({
    id:{
      primaryKey:true,
      type:DataTypes.UUID,
      defaultValue:require("sequelize").UUIDV4
    },
    walletamount: DataTypes.DOUBLE,
    type: DataTypes.STRING,
    frenchise_id: DataTypes.STRING,
    trans_frenchiseid: DataTypes.STRING,
    active_status: DataTypes.BOOLEAN,
    weight: DataTypes.DOUBLE,
    debit_credit: DataTypes.DOUBLE,
    c_note_no: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'adminwallet',
  });
  return adminwallet;
};