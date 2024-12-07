'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DarboLaikas', [
      {
        data: new Date(),
        nuo_kada: new Date(new Date().setHours(9, 0, 0)),
        iki_kada: new Date(new Date().setHours(17, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data: new Date(),
        nuo_kada: new Date(new Date().setHours(10, 0, 0)),
        iki_kada: new Date(new Date().setHours(18, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DarboLaikas', null, {});
  }
};
