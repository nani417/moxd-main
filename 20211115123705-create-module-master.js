'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('module_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      module_name: {
        type: Sequelize.STRING
      },
      update_module: {
        type: Sequelize.BOOLEAN
      },
      veiw_module: {
        type: Sequelize.BOOLEAN
      },
      delete_module: {
        type: Sequelize.BOOLEAN
      },
      IpAddress: {
        type: Sequelize.STRING,
        defaultValue: "0.0.0.0"
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('module_masters');
  }
};