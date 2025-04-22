const usuarioService = require("../services/usuarioService");

class UsuarioController {
  async getUsuarios(req, res) {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  }

  async getUsuarioById(req, res) {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    usuario
      ? res.json(usuario)
      : res.status(404).json({ error: "Usuario no encontrado" });
  }

  async createUsuario(req, res) {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  }

  async deleteUsuario(req, res) {
    await usuarioService.deleteUsuario(req.params.id);
    res.json({ message: "Usuario eliminado" });
  }
  async updateUsuario(req, res) {
      try {
          const { id } = req.params;
          const { nombre,correo,telefono} = req.body;
          if (isNaN(id)) {
              return res.status(400).json({ error: "ID inválido" });
          }
          let resultado = await usuarioService.updateUsuario(id, {nombre,correo,telefono});
          if (!resultado[0]) {
              return res.status(404).json({ error: "usuario no encontrado" });
          }
          res.json({ mensaje: "usuario actualizado correctamente" });
      } catch (e) {
          res.status(500).json({ error: "Error en el servidor al actualizar el usuario" });
      }
  }
}

module.exports = new UsuarioController();