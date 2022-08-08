'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliver_boy_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      commissionPer: {
        type: Sequelize.STRING
      },
      frenchise_id: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      father_name: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      languages: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      VechileType: {
        type: Sequelize.STRING
      },
       Model: {
        type: Sequelize.STRING
      },
       VechileNo: {
        type: Sequelize.STRING
      },
       AccountNumber: {
        type: Sequelize.STRING
      },
       AccountName: {
        type: Sequelize.STRING
      },
       BankName: {
        type: Sequelize.STRING
      },
       IFSC_Code: {
        type: Sequelize.STRING
      },
       PanNumber: {
        type: Sequelize.STRING
      },
       PanImage: {
        type: Sequelize.STRING
      },
       LicenseNumber: {
        type: Sequelize.STRING
      },
       LicenseImage: {
        type: Sequelize.STRING
      }, 
      AadharNo: {
        type: Sequelize.STRING
      },
       AadharImageFront: {
        type: Sequelize.STRING
      }, 
      AadharImageBack: {
        type: Sequelize.STRING
      },     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deliver_boy_masters');
  }
};