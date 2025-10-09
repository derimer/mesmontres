const express = require("express");
const ContactRepository = require("../../../../database/models/contactRepository");

module.exports = (db) => {
  const router = express.Router();
  const contactRepo = new ContactRepository(db);

  // POST pour envoyer un message
  router.post("/", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    try {
      await contactRepo.create({ name, email, subject, message });
      return res
        .status(201)
        .json({ message: "Votre message a été envoyé avec succès !" });
    } catch (error) {
      console.error("Erreur contactRouter :", error);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });

  // GET pour récupérer tous les messages
  router.get("/", async (req, res) => {
    try {
      const messages = await contactRepo.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });
  // DELETE /api/contact/:id
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await contactRepo.deleteMessage(id);
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
