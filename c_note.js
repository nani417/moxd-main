'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class c_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      c_note.hasOne(models.Frenchise, { foreignKey: 'id', sourceKey: 'frenchise_id' });

    }
  };
  c_note.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    frenchise_id: DataTypes.STRING,
    start_no: DataTypes.STRING,
    end_no: DataTypes.STRING,
    quantity: DataTypes.STRING,
    cash_mode: DataTypes.STRING,
    amount: DataTypes.STRING,
    receive_date: DataTypes.BOOLEAN,
    receive_amount: DataTypes.STRING,
    remarks: DataTypes.STRING,
    status: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'c_note',
  });
  return c_note;
};