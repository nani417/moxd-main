'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      weights.hasMany(models.distances,{ foreignKey: 'weight_id', sourceKey: 'id' });

    }
  };
  weights.init({
    weight_from: DataTypes.INTEGER,
    weight_to: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'weights',
  });
  return weights;
};