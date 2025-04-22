const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");

router.get("/", prestamoController.getPrestamo);
router.get("/:id", prestamoController.getPrestamoById);
router.put("/:id", prestamoController.updatePrestamo);
router.post("/", prestamoController.createPrestamo);
router.delete("/:id", prestamoController.deletePrestamo);

module.exports = router;