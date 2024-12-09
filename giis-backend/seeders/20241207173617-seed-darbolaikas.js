'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();
    const zeroTimeDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const zeroTimeDateTomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    return queryInterface.bulkInsert('DarboLaikas', [
      {
        data: zeroTimeDate,
        nuo_kada: new Date(new Date().setHours(9, 0, 0)),
        iki_kada: new Date(new Date().setHours(17, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data: zeroTimeDate,
        nuo_kada: new Date(new Date().setHours(10, 0, 0)),
        iki_kada: new Date(new Date().setHours(18, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data: zeroTimeDateTomorrow,
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
