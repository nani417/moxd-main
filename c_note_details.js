'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class c_note_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      c_note_details.hasOne(models.c_note, { foreignKey: 'id', sourceKey: 'c_note_id' });      
    }
  };
  c_note_details.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    frenchise_id: DataTypes.STRING,
    c_note_no: DataTypes.STRING,
    c_note_id: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'c_note_details',
  });
  return c_note_details;
};