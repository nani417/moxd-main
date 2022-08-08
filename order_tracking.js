'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_tracking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_tracking.belongsTo(models.FranchiseFrom, { foreignKey: 'frenchise_id_from', targetKey: 'id' });
      order_tracking.belongsTo(models.FranchiseTo, { foreignKey: 'frenchise_id_to', targetKey: 'id' });
      
      //order_tracking.belongsTo(models.Frenchise,{foreignKey: 'frenchise_id_from', foreignKeyConstraint: false} );
     // order_tracking.hasMany(models.Frenchise ,{});
    }
  };
  order_tracking.init({
    frenchise_id_from: DataTypes.UUID,
    frenchise_id_to: DataTypes.UUID,
    frenchise_id_from_trans: DataTypes.UUID,
    frenchise_id_to_trans: DataTypes.UUID,
    order_status: {
      type: DataTypes.STRING,
      defaultValue:"pending"
    },
    type: DataTypes.STRING,
    accept_count: DataTypes.INTEGER,
    total_count: DataTypes.INTEGER,
    ogm_no: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order_tracking',
  });
  return order_tracking;
};