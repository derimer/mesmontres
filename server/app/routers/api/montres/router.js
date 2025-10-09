// montres/router.js
// server/app/routers/api/montres/router.js
const express = require("express");
const multer = require("multer");
const path = require("path");

// 👉 il manquait cette ligne
const montreController = require("../../../controllers/montreController");

const router = express.Router();

// Config stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});
const upload = multer({ storage });

// POST -> créer montre + images
router.post("/", upload.array("images"), montreController.create);
router.get("/:id", montreController.getMontreById);

// GET -> récupérer toutes les montres avec images
router.get("/", montreController.getAllMontres);

// DELETE -> supprimer une montre et ses images
router.delete("/:id", montreController.deleteMontre);

module.exports = router;
