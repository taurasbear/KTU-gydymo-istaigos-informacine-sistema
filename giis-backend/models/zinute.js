'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zinute extends Model {
    static associate(models) {
      Zinute.belongsTo(models.Naudotojas, {
        foreignKey: 'naudotojas_id',
        as: 'naudotojas'
      });
      Zinute.belongsTo(models.Gydytojas, {
        foreignKey: 'gydytojas_id',
        as: 'gydytojas'
      });
    }
  }
  Zinute.init({
    turinys: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naudotojas_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Naudotojas',
        key: 'id'
      },
      allowNull: false
    },
    gydytojas_id: {
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
    //tableName: 'zinute',
  });
  return Zinute;
};