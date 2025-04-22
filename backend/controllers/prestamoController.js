const prestamoService = require("../services/prestamoService");

class PrestamoController {
  async getPrestamo(req, res) {
    const prestamo = await prestamoService.getAllPrestamo();
    res.json(prestamo);
  }

  async getPrestamoById(req, res) {
    const prestamo = await prestamoService.getPrestamoById(req.params.id);
    prestamo
      ? res.json(prestamo)
      : res.status(404).json({ error: "Prestamo no encontrado" });
  }

  async createPrestamo(req, res) {
    const nuevoPrestamo = await prestamoService.createPrestamo(req.body);
    res.status(201).json(nuevoPrestamo);
  }

  async deletePrestamo(req, res) {
    await prestamoService.deletePrestamo(req.params.id);
    res.json({ message: "Prestamo eliminado" });
  }
  async updatePrestamo(req, res) {
    try {
        const { id } = req.params;
        const { usuario_id,libro_id,fecha_prestamo,fecha_devolucion,estado } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        let resultado = await prestamoService.updatePrestamo(id, {usuario_id,libro_id,fecha_prestamo,fecha_devolucion,estado});

        if (!resultado[0]) {
            return res.status(404).json({ error: "prestamo no encontrado" });
        }

        res.json({ mensaje: "prestamo actualizado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error en el servidor al actualizar el prestamo" });
    }
}

}

module.exports = new PrestamoController();