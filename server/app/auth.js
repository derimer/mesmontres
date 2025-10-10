// server/app/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Mot de passe admin en clair
const { ADMIN_PASSWORD } = process.env;


// Génération d'un hash au démarrage
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Secret pour JWT (à mettre dans ton .env)
const JWT_SECRET = process.env.JWT_SECRET || "secret_super_sécurisé";

// POST /api/login
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Mot de passe requis" });
    }

    const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!match) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Génération du token
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
