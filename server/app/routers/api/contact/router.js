const express = require("express");
const ContactRepository = require("../../../../database/models/contactRepository");
const contactController = require("../../../controllers/contactController");

const router = express.Router();
const contactRepository = new ContactRepository();

// POST — Enregistrer un message
router.post("/", (req, res) => contactController.storeMessage(req, res));

// GET — Récupérer tous les messages
router.get("/", (req, res) => contactController.getMessages(req, res));

// DELETE — Supprimer un message
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await contactRepository.delete(id);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Message supprimé avec succès !" });
    } else {
      res.status(404).json({ message: "Message non trouvé." });
    }
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du message :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

module.exports = router;
