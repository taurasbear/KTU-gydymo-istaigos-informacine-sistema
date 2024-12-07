'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Naudotojas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prisijungimo_vardas: {
        type: Sequelize.STRING
      },
      slaptazodis: {
        type: Sequelize.STRING
      },
      vardas: {
        type: Sequelize.STRING
      },
      pavarde: {
        type: Sequelize.STRING
      },
      el_pastas: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Naudotojas');
  }
};