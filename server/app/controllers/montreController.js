const MontreRepository = require("../../database/models/montreRepository");
const imageRepo = require("../../database/models/imagesRepository");

const montreRepo = new MontreRepository();

const montreController = {
  create: async (req, res) => {
    try {
      const montreData = {
        name: req.body.name,
        brand: req.body.brand,
        price: parseFloat(req.body.price) || 0,
        mouvement: req.body.mouvement || "Automatique",
        materiau_boitier: req.body.materiau_boitier || "Acier inoxydable",
        couleur_cadran: req.body.couleur_cadran || "Noir",
        bracelet: req.body.bracelet || "Bracelet acier",
        resistance_eau: req.body.resistance_eau || "50m",
        description: req.body.description || "",
        referenceURL: req.body.referenceURL || null,
      };

      const montreId = await montreRepo.create(montreData);

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
      console.error(err);
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
      console.error(err);
      res.status(500).json({ error: "Erreur lors du chargement des montres" });
    }
  },

  // ✅ CORRECTION ICI - Supprimez la récupération supplémentaire des images
  getMontreById: async (req, res) => {
    try {
      const { id } = req.params;
      console.info("🔍 Fetching watch with ID:", id); // Debug

      const montre = await montreRepo.read(id);
      console.info("📦 Montre from repository:", {
        id: montre?.id,
        referenceURL: montre?.referenceURL,
        imagesCount: montre?.images?.length,
      }); // Debug

      if (!montre) {
        return res.status(404).json({ error: "Montre non trouvée" });
      }

      // ❌ SUPPRIMEZ ces 2 lignes - les images sont déjà incluses par montreRepo.read(id)
      // const images = await imageRepo.readByMontreId(id);
      // montre.images = images;

      console.info("✅ Final response referenceURL:", montre.referenceURL); // Debug

      return res.status(200).json(montre);
    } catch (err) {
      console.error("Erreur getMontreById:", err);
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
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la montre" });
    }
  },
};

module.exports = montreController;
