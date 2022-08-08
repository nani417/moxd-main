'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FranchiseTo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FranchiseTo.hasMany(models.Frenchise, { foreignKey: 'id', sourceKey: 'frenchise_id_to' });
    }
  };
  FranchiseTo.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    frenchise_id_to: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'FranchiseTo',
  });
  return FranchiseTo;
};