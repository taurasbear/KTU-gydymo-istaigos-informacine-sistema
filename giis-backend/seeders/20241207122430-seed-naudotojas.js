'use strict';

const bcrypt = require('bcryptjs');
const NaudotojoTipas = require('../constants/naudotojoTipas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassAdministratorius = bcrypt.hashSync('admin', 10);
    const hashPassGydytojas = bcrypt.hashSync('gyd', 10);
    const hashPassPacientas = bcrypt.hashSync('pac', 10);

    await queryInterface.bulkInsert('Naudotojas', [
      {
        prisijungimo_vardas: 'tauras',
        slaptazodis: hashPassGydytojas,
        vardas: 'Tauras',
        pavarde: 'Pavardenis',
        el_pastas: 'tauras@example.com',
        naudotojo_tipas: NaudotojoTipas.GYDYTOJAS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'emilis',
        slaptazodis: hashPassGydytojas,
        vardas: 'Emilis',
        pavarde: 'Pavardenis',
        el_pastas: 'emilis@example.com',
        naudotojo_tipas: NaudotojoTipas.GYDYTOJAS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'gabija',
        slaptazodis: hashPassGydytojas,
        vardas: 'Gabija',
        pavarde: 'Pavardenis',
        el_pastas: 'gabija@example.com',
        naudotojo_tipas: NaudotojoTipas.GYDYTOJAS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'eva',
        slaptazodis: hashPassPacientas,
        vardas: 'Eva',
        pavarde: 'Pavardenis',
        el_pastas: 'eva@example.com',
        naudotojo_tipas: NaudotojoTipas.PACIENTAS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'karolis',
        slaptazodis: hashPassPacientas,
        vardas: 'Karolis',
        pavarde: 'Pavardenis',
        el_pastas: 'karolis@example.com',
        naudotojo_tipas: NaudotojoTipas.PACIENTAS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'ignas',
        slaptazodis: hashPassPacientas,
        vardas: 'Ignas',
        pavarde: 'Pavardenis',
        el_pastas: 'ignas@example.com',
        naudotojo_tipas: NaudotojoTipas.PACIENTAS,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prisijungimo_vardas: 'liudas',
        slaptazodis: hashPassAdministratorius,
        vardas: 'Liudas',
        pavarde: 'Pavardenis',
        el_pastas: 'liudas@example.com',
        naudotojo_tipas: NaudotojoTipas.ADMINISTRATORIUS,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Naudotojas', null, {});
  }
};
