const libroService = require("../services/libroService");

class LibroController {
  async getLibro(req, res) {
    const libro = await libroService.getAllLibro();
    res.json(libro);
  }

  async getLibroById(req, res) {
    const libro = await libroService.getLibroById(req.params.id);
    libro
      ? res.json(libro)
      : res.status(404).json({ error: "Libro no encontrado" });
  }

  async createLibro(req, res) {
    console.log("📦 Body recibido:", req.body); // 👈 Verifica el contenido
    try {
      const nuevoLibro = await libroService.createLibro(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      console.error("❌ Error al crear libro:", error.message);
      res.status(500).json({ error: "Error al crear libro" });
    }
  }
  

  async deleteLibro(req, res) {
    await libroService.deleteLibro(req.params.id);
    res.json({ message: "Libro eliminado" });
  }

  async updateLibro(req, res) {
    try {
        const { id } = req.params;
        const { titulo,autor,anio_public,stock } = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        let resultado = await libroService.updateLibro(id, {titulo,autor,anio_public,stock});
        if (!resultado[0]) {
            return res.status(404).json({ error: "libro no encontrado" });
        }
        res.json({ mensaje: "libro actualizado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error en el servidor al actualizar el libro" });
    }
}
}

module.exports = new LibroController();