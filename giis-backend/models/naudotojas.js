'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Naudotojas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }, {
    sequelize,
    modelName: 'Naudotojas',
  });
  return Naudotojas;
};