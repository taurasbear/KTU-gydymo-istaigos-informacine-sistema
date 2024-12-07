'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GydytojoDarboLaikas', [
      {
        gydytojas_id: 1,
        darbo_laikas_id: 1, // Assuming this corresponds to the first entry in DarboLaikas
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gydytojas_id: 2,
        darbo_laikas_id: 2, // Assuming this corresponds to the second entry in DarboLaikas
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('GydytojoDarboLaikas', null, {});
  }
};
