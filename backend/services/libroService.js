const { Libro } = require("../models");
class LibroService {
  async getAllLibro() {
    return await Libro.findAll();
  }

  async getLibroById(id) {
    return await Libro.findByPk(id);
  }

  async createLibro(data) {
    return await Libro.create(data);
  }

  async deleteLibro(id) {
    return await Libro.destroy({ where: { id } });
  }

  async updateLibro(id, datos) {
    try {
        let actualizado = await Libro.update(datos, { where: { id } });
        return actualizado;
    } catch (e) {
        console.log("Error en el servidor al actualizar el libro:", e);
    }
}
}

module.exports = new LibroService();