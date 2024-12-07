'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DarboLaikas extends Model {
    static associate(models) {
      DarboLaikas.hasMany(models.GydytojoDarboLaikas, {
        foreignKey: 'darbo_laikas_id',
        as: 'gydytojo_darbo_laikas'
      });
    }
  }
  DarboLaikas.init({
    data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nuo_kada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    iki_kada: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'DarboLaikas',
    //tableName: 'darbo_laikas'
  });
  return DarboLaikas;
};