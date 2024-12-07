'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rezervacija extends Model {
    static associate(models) {
      Rezervacija.belongsTo(models.Naudotojas, {
        foreignKey: 'naudotojas_id'
      });
      Rezervacija.belongsTo(models.GydytojoDarboLaikas, {
        foreignKey: 'gydytojo_darbo_laikas_id'
      });
    }
  }
  Rezervacija.init({
    nuo_kada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    iki_kada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    naudotojas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Naudotojas',
        key: 'id'
      }
    },
    gydytojo_darbo_laikas_id: {
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
    //tableName: 'rezervacija',
  });
  return Rezervacija;
};