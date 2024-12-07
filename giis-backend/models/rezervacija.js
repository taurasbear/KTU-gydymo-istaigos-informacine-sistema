'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rezervacija extends Model {
    static associate(models) {
      Rezervacija.belongsTo(models.Naudotojas, {
        foreignKey: 'naudotojasId'
      });
      Rezervacija.belongsTo(models.GydytojoDarboLaikas, {
        foreignKey: 'gydytojoDarboLaikasId'
      });
    }
  }
  Rezervacija.init({
    nuoKada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ikiKada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    naudotojasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Naudotojas',
        key: 'id'
      }
    },
    gydytojoDarboLaikasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'GydytojoDarboLaikas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Rezervacija',
  });
  return Rezervacija;
};