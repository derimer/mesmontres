// server/app/auth.js

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminRepository = require("../database/models/adminrepository");
const db = require("../database/client");

const adminRepo = new AdminRepository(db);
const router = express.Router();

// Secret JWT
const JWT_SECRET = process.env.JWT_SECRET || "secret";


// ==============================
// Vérifier si un admin existe
// ==============================
router.get("/exists", async (req, res) => {
  try {
    const admin = await adminRepo.findAdmin();
    res.json({ exists: !!admin });
  } catch (err) {
    console.error("Erreur /exists :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// ==============================
// Créer un admin (1 seule fois)
// ==============================
router.post("/register", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Mot de passe requis" });
    }

    const existing = await adminRepo.findAdmin();

    if (existing) {
      return res.status(400).json({ error: "Un administrateur existe déjà" });
    }

    const hash = await bcrypt.hash(password, 10);

    await adminRepo.createAdmin(hash);

    return res.json({ success: true });
  } catch (err) {
    console.error("Erreur /register :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});


// ==============================
// Login admin
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Mot de passe requis" });
    }

    const admin = await adminRepo.findAdmin();

    if (!admin) {
      return res.status(400).json({ error: "Aucun administrateur enregistré" });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ token });
  } catch (err) {
    console.error("Erreur /login :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
