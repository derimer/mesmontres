const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const montreController = require("../../../controllers/montreController");

const router = express.Router();

// ✅ Chemin correct vers le dossier uploads
const uploadDir = path.join(__dirname, "../../../../public/uploads");

// ✅ Création automatique du dossier s’il n’existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.info(`📂 Dossier créé automatiquement : ${uploadDir}`);
}

// ✅ Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Le chemin est maintenant sûr
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanName = file.originalname.toLowerCase().replace(/\s+/g, "_");
    cb(null, `${uniqueSuffix}-${cleanName}`);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.array("images"), montreController.create);
router.get("/", montreController.getAllMontres);
router.get("/:id", montreController.getMontreById);
router.put("/:id", upload.array("images"), montreController.update);
router.delete("/:id", montreController.deleteMontre);

// ✅ Export du router
module.exports = router;
