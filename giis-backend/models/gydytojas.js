'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gydytojas extends Model {
    static associate(models) {
      Gydytojas.belongsTo(models.Naudotojas, {
        foreignKey: 'naudotojas_id',
        as: 'naudotojas'
      });
      Gydytojas.hasMany(models.Zinute, {
        foreignKey: 'gydytojas_id',
        as: 'zinute'
      });
      Gydytojas.hasMany(models.GydytojoDarboLaikas, {
        foreignKey: 'gydytojas_id',
        as: 'gydytojo_darbo_laikas'
      });
    }
  }
  Gydytojas.init({
    specialybe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naudotojas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Naudotojas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Gydytojas',
    //tableName: 'gydytojas',
  });
  return Gydytojas;
};