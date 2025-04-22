const { Prestamo } = require("../models");
class PrestamoService {
  async getAllPrestamo() {
    return await Prestamo.findAll();
  }

  async getPrestamoById(id) {
    return await Prestamo.findByPk(id);
  }

  async createPrestamo(data) {
    return await Prestamo.create(data);
  }

  async deletePrestamo(id) {
    return await Prestamo.destroy({ where: { id } });
  }
  async updatePrestamo(id, datos) {
    try {
        let actualizado = await Prestamo.update(datos, { where: { id } });
        return actualizado;
    } catch (e) {
        console.log("Error en el servidor al actualizar el Prestamo:", e);
    }
}
}

module.exports = new PrestamoService();