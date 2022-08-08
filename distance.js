'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class distances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  distances.init({
    dist_from: DataTypes.INTEGER,
    dist_to: DataTypes.INTEGER,
    air_amount: DataTypes.INTEGER,
    surface_amount: DataTypes.INTEGER,
    weight_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'distances',
    paranoid:true,
    timestamps:true
  });
  return distances;
};