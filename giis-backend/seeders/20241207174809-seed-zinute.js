'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zinute', [
      {
        turinys: 'First message content',
        naudotojas_id: 1,
        gydytojas_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        turinys: 'Second message content',
        naudotojas_id: 2,
        gydytojas_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zinute', null, {});
  }
};
