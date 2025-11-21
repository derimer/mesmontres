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
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost",
  "http://127.0.0.1"
];


app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware JSON
app.use(express.json());

// =============================
// Fichiers statiques
// =============================
const uploadsPath =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "app/public/uploads") // VPS
    : path.join(__dirname, "public/uploads");    // local

console.info("📁 Static files served from:", uploadsPath);
app.use("/api/uploads", express.static(uploadsPath));



// =============================
// Routers
// =============================
const imageRoutes = require("./app/routers/api/images/router");
const montresRoutes = require("./app/routers/api/montres/router");
const contactRouter = require("./app/routers/api/contact/router");

// Auth
const loginRouter = require("./app/auth");

// Routes publiques
app.use("/api/admin", loginRouter);
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

app.listen(PORT, "0.0.0.0", () => {
  db.checkConnection();
  console.info(`✅ Server listening on port ${PORT}`);
});

module.exports = app;
