const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.getUsuarios);
router.put("/:id", usuarioController.updateUsuario);
router.get("/:id", usuarioController.getUsuarioById);
router.post("/ag", usuarioController.createUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

module.exports = router;