'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rezervacija', [
      {
        nuo_kada: new Date('2024-12-08T09:00:00Z'),
        iki_kada: new Date('2024-12-08T10:00:00Z'),
        naudotojas_id: 1,
        gydytojo_darbo_laikas_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nuo_kada: new Date('2024-12-08T12:00:00Z'),
        iki_kada: new Date('2024-12-08T13:00:00Z'),
        naudotojas_id: 2,
        gydytojo_darbo_laikas_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rezervacija', null, {});
  }
};
