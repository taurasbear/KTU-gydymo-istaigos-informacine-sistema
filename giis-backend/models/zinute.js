'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zinute extends Model {
    static associate(models) {
      Zinute.belongsTo(models.Naudotojas, {
        foreignKey: 'naudotojasId',
        as: 'naudotojas'
      });
      Zinute.belongsTo(models.Gydytojas, {
        foreignKey: 'gydytojasId',
        as: 'gydytojas'
      });
    }
  }
  Zinute.init({
    turinys: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naudotojasId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Naudotojas',
        key: 'id'
      },
      allowNull: false
    },
    gydytojasId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Gydytojas',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Zinute',
    tableName: 'Zinute',
  });
  return Zinute;
};