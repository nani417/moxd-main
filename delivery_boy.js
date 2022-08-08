'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class delivery_boy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  delivery_boy.init({
    //frenchise_id: DataTypes.UUID,
    delivery_boy_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'delivery_boy',
  });
  return delivery_boy;
};