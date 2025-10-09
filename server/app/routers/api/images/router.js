const express = require("express");
const multer = require("multer");
const path = require("path");
const imagesController = require("../../../controllers/imagesController");

const router = express.Router();

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Enregistrer dans server/public/uploads
    cb(null, path.join(__dirname, "../../../public/uploads"));
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanName = file.originalname.toLowerCase().replace(/\s+/g, "_"); // remplacer espaces par underscore
    cb(null, `${uniqueSuffix}-${cleanName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Seules les images sont autorisées"), false);
    }
  },
});

// Routes
router.get("/", imagesController.readAll);
router.get("/:id", imagesController.readOne);

// Gestion de plusieurs images
router.post("/", upload.array("images", 10), imagesController.create);

router.delete("/:id", imagesController.delete);

module.exports = router;
