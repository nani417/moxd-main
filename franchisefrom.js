'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FranchiseFrom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FranchiseFrom.hasMany(models.Frenchise, { foreignKey: 'id', sourceKey: 'frenchise_id_from' });

    }
  };
  FranchiseFrom.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    frenchise_id_from: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'FranchiseFrom',
  });
  return FranchiseFrom;
};