'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zinute', [
      {
        turinys: 'First message content',
        naudotojasId: 1,
        gydytojasId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        turinys: 'Second message content',
        naudotojasId: 2,
        gydytojasId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zinute', null, {});
  }
};
