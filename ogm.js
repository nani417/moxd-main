'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OGM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OGM.belongsTo(models.order_transactions, { foreignKey: 'c_node_no', targetKey: 'c_node_no' });
      OGM.hasMany(models.order_tracking, { foreignKey: 'ogm_no', sourceKey: 'OGM_no' });
    }
  };
  OGM.init({
    c_node_no: DataTypes.UUID,
    OGM_no: DataTypes.UUID,
    frenchise_id: DataTypes.UUID,
    source_franchise_id:DataTypes.UUID,
    weight: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN,
    type:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OGM',
  });
  return OGM;
};