// server/app/controllers/montreController.js
const MontreRepository = require("../../database/models/montreRepository");
const imageRepo = require("../../database/models/imagesRepository");

const montreRepo = new MontreRepository();

const montreController = {

  // ✅ Création d'une montre complète
  create: async (req, res) => {
    console.info("=== 🎯 Création d'une montre ===");
    console.info("Body:", req.body);
    console.info("Fichiers:", req.files);
    // eslint-disable-next-line no-console
console.log("🖼️ Fichiers reçus par Multer :", req.files);

    


    try {
      const montreData = {
        reference: req.body.reference || "Référence inconnue",
        brand: req.body.brand,
        type: req.body.type || "Classique",
        type_de_mouvement: req.body.type_de_mouvement || "Automatique",
        origine_mouvement: req.body.origine_mouvement || "Suisse",
        price: parseFloat(req.body.price) || 0,
        mouvement: req.body.mouvement || "Automatique",
        materiau_boitier: req.body.materiau_boitier || "Acier inoxydable",
        couleur_cadran: req.body.couleur_cadran || "Noir",
        bracelet: req.body.bracelet || "Bracelet acier",
        resistance_eau: req.body.resistance_eau || "3 ATM",
        description: req.body.description || "",
        referenceURL: req.body.referenceURL || null,
      };

      // 🔍 Vérifie si la montre existe déjà
      const [existing] = await montreRepo.database.query(
        `SELECT id FROM montres WHERE reference = ? LIMIT 1`,
        [montreData.reference]
      );

      let montreId;
      if (existing.length > 0) {
        montreId = existing[0].id;
        console.info(`⚠️ Montre déjà existante (id: ${montreId})`);
      } else {
        montreId = await montreRepo.create(montreData);
        console.info(`✅ Nouvelle montre créée (id: ${montreId})`);
      }

      // ✅ Ajout des images uploadées
      if (req.files && req.files.length > 0) {
        console.info("🖼️ Images reçues :", req.files.map((f) => f.filename));

        await Promise.all(
          req.files.map((file, index) =>
            imageRepo.create({
              montre_id: montreId,
              filename: file.filename,
              position: index,
            })
          )
        );

        console.info(`📸 ${req.files.length} image(s) ajoutée(s) pour la montre ${montreId}`);
      } else {
        console.warn("⚠️ Aucune image reçue lors de la création de la montre.");
      }

      // 🧩 Relit la montre complète avec ses images
      const newMontre = await montreRepo.read(montreId);

      // ✅ Retourne la montre complète (avec images)
      res.status(201).json(newMontre);
    } catch (err) {
      console.error("❌ Erreur création montre :", err);
      res.status(500).json({ error: "Erreur lors de la création de la montre" });
    }
  },

  // ✅ Mise à jour d'une montre existante
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const existingMontre = await montreRepo.readWithImages(id);

      if (!existingMontre) {
        return res.status(404).json({ error: "Montre non trouvée" });
      }

      const montreData = {
        reference: req.body.reference || existingMontre.reference,
        brand: req.body.brand || existingMontre.brand,
        type: req.body.type || existingMontre.type,
        type_de_mouvement:
          req.body.type_de_mouvement || existingMontre.type_de_mouvement,
        origine_mouvement:
          req.body.origine_mouvement || existingMontre.origine_mouvement,
        price: parseFloat(req.body.price) || existingMontre.price,
        mouvement: req.body.mouvement || existingMontre.mouvement,
        materiau_boitier:
          req.body.materiau_boitier || existingMontre.materiau_boitier,
        couleur_cadran:
          req.body.couleur_cadran || existingMontre.couleur_cadran,
        bracelet: req.body.bracelet || existingMontre.bracelet,
        resistance_eau:
          req.body.resistance_eau || existingMontre.resistance_eau,
        description: req.body.description || existingMontre.description,
        referenceURL: req.body.referenceURL || existingMontre.referenceURL,
      };

      await montreRepo.update(id, montreData);

      // ✅ Suppression des images supprimées côté client
      if (req.body.existingImages) {
        try {
          const keptImages = JSON.parse(req.body.existingImages);
          const currentImages = existingMontre.images || [];
          const imagesToDelete = currentImages.filter(
            (img) => !keptImages.some((keep) => keep.id === img.id)
          );
          if (imagesToDelete.length > 0) {
            await Promise.all(
              imagesToDelete.map((img) => imageRepo.delete(img.id))
            );
          }
        } catch (err) {
          console.warn("⚠️ Erreur parsing existingImages :", err);
        }
      }

      // ✅ Ajout des nouvelles images avec ordre d’import
      let newImages = [];
      if (req.files && req.files.length > 0) {
        newImages = await Promise.all(
          req.files.map(async (file, index) => {
            const imageId = await imageRepo.create({
              montre_id: id,
              filename: file.filename,
              position: index, // 🧩 conserve aussi l’ordre d’ajout
            });
            return { id: imageId, filename: file.filename, position: index };
          })
        );
      }

      const updatedMontre = await montreRepo.readWithImages(id);
      return res.status(200).json({
        message: "Montre mise à jour avec succès",
        montre: updatedMontre,
        newImages,
      });
    } catch (err) {
      console.error("❌ Erreur modification montre :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la modification de la montre" });
    }
  },

  // ✅ Lire toutes les montres
  getAllMontres: async (req, res) => {
    console.info("🔥 getAllMontres exécuté → appel à montreRepo.readAll()");
    try {
      const montres = await montreRepo.readAll();
      res.status(200).json(montres);
    } catch (err) {
      console.error("❌ Erreur lecture montres :", err);
      res.status(500).json({ error: "Erreur lors du chargement des montres" });
    }
  },

  // ✅ Lire une montre par ID
  getMontreById: async (req, res) => {
    try {
      const { id } = req.params;
      const montre = await montreRepo.readWithImages(id);
      if (!montre) {
        return res.status(404).json({ error: "Montre non trouvée" });
      }
      return res.status(200).json(montre);
    } catch (err) {
      console.error("❌ Erreur getMontreById :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ✅ Supprimer une montre
  deleteMontre: async (req, res) => {
    try {
      const montreId = req.params.id;
      await imageRepo.deleteByMontreId(montreId);
      await montreRepo.delete(montreId);

      res.status(200).json({ message: "Montre supprimée avec succès" });
    } catch (err) {
      console.error("❌ Erreur suppression montre :", err);
      res.status(500).json({ error: "Erreur lors de la suppression de la montre" });
    }
  },
};

module.exports = montreController;
