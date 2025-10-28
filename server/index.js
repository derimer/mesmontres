/// index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Import du client MySQL
const db = require("./database/client");



const allowedOrigins = [
  "https://les-garde-temps-rieutord.com",
  "https://www.les-garde-temps-rieutord.com",

];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
}));


// Middleware JSON
app.use(express.json());

// =============================
// Fichiers statiques
// =============================
const uploadsPath = path.join(__dirname, "/public/uploads");
console.info("Chemin utilisé pour les uploads :", uploadsPath);
app.use("/api/uploads", express.static(uploadsPath));

// =============================
// Routers
// =============================
const imageRoutes = require("./app/routers/api/images/router");
const montresRoutes = require("./app/routers/api/montres/router");
const contactRouter = require("./app/routers/api/contact/router")(db);

// Auth
const loginRouter = require("./app/auth");

// Routes publiques
app.use("/api/login", loginRouter);
app.use("/api/images", imageRoutes);

// Routes protégées par JWT
app.use("/api/montres", montresRoutes);
app.use("/api/contact", contactRouter);
// =============================
// Routes test
// =============================
app.get("/api/status", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Gestion erreurs
app.use((error, req, res) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});


const PORT = process.env.PORT || 3312;
app.listen(PORT, () => {
  db.checkConnection(); // Vérifie la connexion DB au démarrage
  console.info(`✅ Server listening on port ${PORT}`);
});

module.exports = app;
