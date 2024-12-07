'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gydytojas extends Model {
    static associate(models) {
      Gydytojas.belongsTo(models.Naudotojas, {
        foreignKey: 'naudotojasId',
        as: 'naudotojas'
      })
    }
  }
  Gydytojas.init({
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naudotojasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Gydytojas',
  });
  return Gydytojas;
};