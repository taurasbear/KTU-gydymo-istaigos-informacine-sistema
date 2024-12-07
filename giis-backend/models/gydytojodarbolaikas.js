'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GydytojoDarboLaikas extends Model {
    static associate(models) {
      GydytojoDarboLaikas.hasMany(models.Rezervacija, {
        foreignKey: 'gydytojoDarboLaikasId'
      });
      GydytojoDarboLaikas.belongsTo(models.Gydytojas, {
        foreignKey: 'gydytojasId'
      });
      GydytojoDarboLaikas.belongsTo(models.DarboLaikas, {
        foreignKey: 'darboLaikasId'
      });
    }
  }
  GydytojoDarboLaikas.init({
    gydytojasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Gydytojas',
        key: 'id'
      }
    },
    darboLaikasId: {
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
  });
  return GydytojoDarboLaikas;
};