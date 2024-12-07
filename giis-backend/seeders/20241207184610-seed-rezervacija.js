'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rezervacija', [
      {
        nuo_kada: new Date(),
        iki_kada: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
        naudotojas_id: 1,
        gydytojo_darbo_laikas_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nuo_kada: new Date(),
        iki_kada: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
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
