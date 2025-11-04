const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // ✅ pour vérifier/créer le dossier automatiquement

// 👉 Controller
const montreController = require("../../../controllers/montreController");

const router = express.Router();

// ✅ Création automatique du dossier "uploads" s’il n’existe pas
const uploadDir = path.join(__dirname, "../../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.info(`📂 Dossier créé automatiquement : ${uploadDir}`);
}

// ✅ Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // le chemin est maintenant sûr et existant
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.array("images"), montreController.create);
router.get("/", montreController.getAllMontres);
router.get("/:id", montreController.getMontreById);
router.put("/:id", upload.array("images"), montreController.update);
router.delete("/:id", montreController.deleteMontre);

module.exports = router;
