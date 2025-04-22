const { Usuarios } = require("../models");
class UsuarioService {
  async getAllUsuarios() {
    return await Usuarios.findAll();
  }

  async getUsuarioById(id) {
    return await Usuarios.findByPk(id);
  }

  async createUsuario(data) {
    return await Usuarios.create(data);
  }

  async deleteUsuario(id) {
    return await Usuarios.destroy({ where: { id } });
  }
  async updateUsuario(id, datos) {
    try {
        let actualizado = await Usuarios.update(datos, { where: { id } });
        return actualizado;
    } catch (e) {
        console.log("Error en el servidor al actualizar el usuario:", e);
    }
}
}

module.exports = new UsuarioService();