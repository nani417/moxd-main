'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assign_deliveryboy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      assign_deliveryboy.hasMany(models.Frenchise,{ foreignKey: 'id', sourceKey: 'franchise_id' });
      assign_deliveryboy.hasMany(models.deliver_boy_master,{ foreignKey: 'id', sourceKey: 'delivery_boy_id' });
      assign_deliveryboy.hasMany(models.order_transactions,{ foreignKey: 'c_node_no', sourceKey: 'c_note_no' });
      assign_deliveryboy.hasMany(models.drs_data,{ foreignKey: 'drs_no', sourceKey: 'drs_no' });
      //assign_deliveryboy.hasMany(models.order_transactions,{ foreignKey: 'delivery_status', sourceKey: 'delivery_status' });

    }
  };
  assign_deliveryboy.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4
    },
    drs_no:DataTypes.STRING,
    date_time: DataTypes.DATE,
    delivery_boy_id: DataTypes.UUID,
    area_id: DataTypes.UUID,
    c_note_no: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    no_pcs: DataTypes.INTEGER,
    receiver_name: DataTypes.STRING,
    receiver_mobile: DataTypes.STRING,
    remarks: DataTypes.STRING,
    franchise_id: DataTypes.STRING,
    delivery_status: DataTypes.STRING,
    receipt_img_url:DataTypes.STRING,
    pod_image:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'assign_deliveryboy',
  });
  return assign_deliveryboy;
};