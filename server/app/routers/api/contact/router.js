const express = require("express");
const contactController = require("../../../controllers/contactController"); // <-- adapte le chemin selon ton arborescence

module.exports = (db) => {
  const router = express.Router();

  // POST pour envoyer un message (enregistre + envoie email)
  router.post("/", (req, res) => contactController.storeMessage(req, res));

  // GET pour récupérer tous les messages
  router.get("/", (req, res) => contactController.getMessages(req, res));

  // DELETE /api/contact/:id
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await db
        .getRepository("contact")
        .deleteMessage(id); // ou utilise ton contactRepository si défini
      if (deleted) {
        res.status(200).json({ message: "Message supprimé avec succès !" });
      } else {
        res.status(404).json({ message: "Message non trouvé." });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });

  return router;
};
