'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rate_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rate_master.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    weight_type: DataTypes.STRING,
    amount: DataTypes.DOUBLE,    
    user_type: DataTypes.STRING,
    from_weight: DataTypes.INTEGER,
    to_weight: DataTypes.INTEGER,
    from_distance: DataTypes.DOUBLE,
    to_distance: DataTypes.DOUBLE,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN,
    
  }, {
    sequelize,
    modelName: 'rate_master',
  });
  return rate_master;
};