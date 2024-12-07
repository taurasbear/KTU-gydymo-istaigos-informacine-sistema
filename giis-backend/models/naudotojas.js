'use strict';
const {
  Model
} = require('sequelize');
const NaudotojoTipas = require('../constants/naudotojoTipas');

module.exports = (sequelize, DataTypes) => {
  class Naudotojas extends Model {
    static associate(models) {
      Naudotojas.hasOne(models.Gydytojas, {
        foreignKey: 'naudotojasId',
        as: 'gydytojas'
      });
      Naudotojas.hasMany(models.Zinute, {
        foreignKey: 'naudotojasId',
        as: 'zinute'
      });
      Naudotojas.hasMany(models.Rezervacija, {
        foreignKey: 'naudotojasId',
        as: 'rezervacija'
      });
    }
  }
  Naudotojas.init({
    prisijungimo_vardas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slaptazodis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vardas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pavarde: {
      type: DataTypes.STRING,
      allowNull: false
    },
    el_pastas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naudotojo_tipas: {
      type: DataTypes.ENUM,
      values: Object.values(NaudotojoTipas),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Naudotojas',
  });
  return Naudotojas;
};