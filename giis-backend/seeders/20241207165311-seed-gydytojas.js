'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Gydytojas', [
      {
        occupation: 'Cardiologist',
        naudotojasId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        occupation: 'Dermatologist',
        naudotojasId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        occupation: 'Neurologist',
        naudotojasId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Gydytojas', null, {});
  }
};
