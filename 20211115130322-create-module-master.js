'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('module_masters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,      
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
      all_module: {
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