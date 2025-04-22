const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/", libroController.getLibro);
router.get("/:id", libroController.getLibroById);
router.put("/:id", libroController.updateLibro);
router.post("/ag", libroController.createLibro);
router.delete("/:id", libroController.deleteLibro);

module.exports = router;
