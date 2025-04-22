'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    
    static associate(models) {
      Usuarios.hasMany(models.Prestamo, {
        foreignKey: 'usuario_id',
        as: 'prestamos',
      });
    }
  }
  Usuarios.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
    timestamps: true
  });
  return Usuarios;
};