'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Frenchise_rate_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Frenchise_rate_master.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    delivery_type: DataTypes.STRING,
    weight: DataTypes.STRING,
    amount_weight: DataTypes.STRING,
    c_note_count: DataTypes.STRING,
    amount_c_note: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Frenchise_rate_master',
    paranoid:true,
    timestamps:true
  });
  return Frenchise_rate_master;
};