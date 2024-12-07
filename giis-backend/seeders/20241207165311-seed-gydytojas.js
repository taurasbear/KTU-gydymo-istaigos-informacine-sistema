'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Gydytojas', [
      {
        occupation: 'Cardiologist',
        naudotojas_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        occupation: 'Dermatologist',
        naudotojas_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        occupation: 'Neurologist',
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
