const express = require("express");
const multer = require("multer");
const path = require("path");
const imagesController = require("../../../controllers/imagesController");
const imageRepo = require("../../../../database/models/imagesRepository");

const router = express.Router();

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 📁 Correction du chemin : on enregistre dans app/public/uploads
    cb(null, path.join(__dirname, "../../../app/public/uploads"));
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanName = file.originalname.toLowerCase().replace(/\s+/g, "_");
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
// ✅ Réordonner les images
router.put("/reorder", async (req, res, next) => {
  try {
    const { imagesOrder } = req.body;

    if (!imagesOrder || !Array.isArray(imagesOrder)) {
      return res.status(400).json({ error: "Format invalide pour imagesOrder" });
    }

    // Mise à jour des positions via le repository
    await Promise.all(
      imagesOrder.map(({ id, position }) =>
        imageRepo.updatePosition(id, position)
      )
    );

    console.info("✅ Ordre des images mis à jour !");
    return res.status(200).json({ message: "Ordre mis à jour avec succès" });
  } catch (err) {
    console.error("❌ Erreur dans PUT /api/images/reorder :", err);
    return next(err);
  }
});


module.exports = router;
