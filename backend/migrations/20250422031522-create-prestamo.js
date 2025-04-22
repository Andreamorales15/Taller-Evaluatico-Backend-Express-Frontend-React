'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prestamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      libro_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Libros',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      fecha_prestamo: {
        type: Sequelize.DATE
      },
      fecha_devolucion: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.ENUM('prestado', 'devuelto'),
        defaultValue: 'prestado',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prestamos');
  }
};