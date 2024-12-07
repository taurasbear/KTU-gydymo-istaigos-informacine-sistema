'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GydytojoDarboLaikas extends Model {
    static associate(models) {
      GydytojoDarboLaikas.hasMany(models.Rezervacija, {
        foreignKey: 'gydytojo_darbo_laikas_id',
        as: 'rezervacija'
      });
      GydytojoDarboLaikas.belongsTo(models.Gydytojas, {
        foreignKey: 'gydytojas_id',
        as: 'gydytojas'
      });
      GydytojoDarboLaikas.belongsTo(models.DarboLaikas, {
        foreignKey: 'darbo_laikas_id',
        as: 'darbo_laikas'
      });
    }
  }
  GydytojoDarboLaikas.init({
    gydytojas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Gydytojas',
        key: 'id'
      }
    },
    darbo_laikas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DarboLaikas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'GydytojoDarboLaikas',
    //tableName: 'gydytojo_darbo_laikas',
  });
  return GydytojoDarboLaikas;
};