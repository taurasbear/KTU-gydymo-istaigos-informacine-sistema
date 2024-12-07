'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DarboLaikas extends Model {
    static associate(models) {
      DarboLaikas.hasMany(models.GydytojoDarboLaikas, {
        foreignKey: 'darboLaikasId'
      });
    }
  }
  DarboLaikas.init({
    data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nuoKada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ikiKada: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'DarboLaikas',
  });
  return DarboLaikas;
};