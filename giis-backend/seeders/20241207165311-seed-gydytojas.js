'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Gydytojas', [
      {
        specialybe: 'Kardiologas',
        naudotojas_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specialybe: 'Odontologas',
        naudotojas_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specialybe: 'Neurologas',
        naudotojas_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Gydytojas', null, {});
  }
};
