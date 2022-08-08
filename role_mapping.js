'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      role_mapping.belongsTo(models.role_master,{ foreignKey: 'role_id', targetKey: 'id' });
      role_mapping.belongsTo(models.module_master,{ foreignKey: 'module_id', targetKey: 'id' });

      // define association here
    }
  };
  role_mapping.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    role_id: DataTypes.STRING,
    module_id: DataTypes.STRING,
    IpAddress: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'role_mapping',
  });
  return role_mapping;
};