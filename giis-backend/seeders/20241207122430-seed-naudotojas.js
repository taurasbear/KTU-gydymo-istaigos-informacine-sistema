'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Naudotojas', [
      {
        prisijungimo_vardas: 'tauras',
        slaptazodis: 'password123',
        vardas: 'Tauras',
        pavarde: 'Pavardenis',
        el_pastas: 'tauras@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'emilis',
        slaptazodis: 'password123',
        vardas: 'Emilis',
        pavarde: 'Pavardenis',
        el_pastas: 'emilis@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'gabija',
        slaptazodis: 'password123',
        vardas: 'Gabija',
        pavarde: 'Pavardenis',
        el_pastas: 'gabija@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'eva',
        slaptazodis: 'password123',
        vardas: 'Eva',
        pavarde: 'Pavardenis',
        el_pastas: 'eva@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'karolis',
        slaptazodis: 'password123',
        vardas: 'Karolis',
        pavarde: 'Pavardenis',
        el_pastas: 'karolis@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'ignas',
        slaptazodis: 'password123',
        vardas: 'Ignas',
        pavarde: 'Pavardenis',
        el_pastas: 'ignas@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'liudas',
        slaptazodis: 'password123',
        vardas: 'Liudas',
        pavarde: 'Pavardenis',
        el_pastas: 'liudas@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Naudotojas', null, {});
  }
};
