const MontreRepository = require("../../database/models/montreRepository");
const imageRepo = require("../../database/models/imagesRepository");

const montreRepo = new MontreRepository();

const montreController = {
  create: async (req, res) => {
    try {
      // Adapter les champs à ta base MySQL réelle
      const montreData = {
        reference: req.body.reference || "Référence inconnue",
        brand: req.body.brand,
        price: parseFloat(req.body.price) || 0,
        type: req.body.type || "Classique",
        type_de_mouvement: req.body.type_de_mouvement || "Automatique",
        origine_mouvement: req.body.origine_mouvement || "Suisse",
        resistance_eau: req.body.resistance_eau || "3 ATM",
        bracelet: req.body.bracelet || "Bracelet acier",
        description: req.body.description || "",
        referenceURL: req.body.referenceURL || null,
      };

      // Création de la montre
      const montreId = await montreRepo.create(montreData);

      // Gestion des images uploadées
      let savedImages = [];
      if (req.files && req.files.length > 0) {
        savedImages = await Promise.all(
          req.files.map(async (file) => {
            const id = await imageRepo.create({
              montre_id: montreId,
              filename: file.filename,
            });
            return { id, filename: file.filename };
          })
        );
      }

      res.status(201).json({ montreId, images: savedImages });
    } catch (err) {
      console.error("❌ Erreur création montre :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de la montre" });
    }
  },

  getAllMontres: async (req, res) => {
    try {
      const montres = await montreRepo.readAll();
      res.status(200).json(montres);
    } catch (err) {
      console.error("❌ Erreur lecture montres :", err);
      res.status(500).json({ error: "Erreur lors du chargement des montres" });
    }
  },

  getMontreById: async (req, res) => {
    try {
      const { id } = req.params;
      console.info("🔍 Fetching watch with ID:", id);

      const montre = await montreRepo.read(id);
      if (!montre) {
        return res.status(404).json({ error: "Montre non trouvée" });
      }

      console.info("✅ Montre récupérée :", montre.reference);
      return res.status(200).json(montre);
    } catch (err) {
      console.error("❌ Erreur getMontreById :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },

  deleteMontre: async (req, res) => {
    try {
      const montreId = req.params.id;

      await imageRepo.deleteByMontreId(montreId);
      await montreRepo.delete(montreId);

      res.status(200).json({ message: "Montre supprimée avec succès" });
    } catch (err) {
      console.error("❌ Erreur suppression montre :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la montre" });
    }
  },
};

module.exports = montreController;
