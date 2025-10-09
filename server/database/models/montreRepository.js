// server/models/montreRepository.js
const AbstractRepository = require("./AbstractRepository");

class MontreRepository extends AbstractRepository {
  constructor() {
    super({ table: "montres" });
  }

  async create(montre) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} 
      (name, brand, price, mouvement, materiau_boitier, couleur_cadran, bracelet, etancheite, description, referenceURL)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        montre.name,
        montre.brand,
        montre.price,
        montre.mouvement,
        montre.materiau_boitier,
        montre.couleur_cadran,
        montre.bracelet,
        montre.etancheite,
        montre.description,
        montre.referenceURL, // Ajout du nouveau champ dans l'insertion
      ]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT m.*, i.id as image_id, i.filename as image_filename
       FROM ${this.table} m
       LEFT JOIN images i ON m.id = i.montre_id
       WHERE m.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    // Construire l'objet montre avec tableau d'images
    const montre = {
      id: rows[0].id,
      name: rows[0].name,
      brand: rows[0].brand,
      price: rows[0].price,
      mouvement: rows[0].mouvement,
      materiau_boitier: rows[0].materiau_boitier,
      couleur_cadran: rows[0].couleur_cadran,
      bracelet: rows[0].bracelet,
      etancheite: rows[0].etancheite,
      description: rows[0].description,
      referenceURL: rows[0].referenceURL,
      images: [],
    };

    // Ajouter les images si elles existent
    rows.forEach((row) => {
      if (row.image_id) {
        montre.images.push({
          id: row.image_id,
          filename: row.image_filename,
        });
      }
    });

    return montre;
  }

  async readAll() {
    // Récupérer toutes les montres avec leurs images
    const [rows] = await this.database.query(`
      SELECT 
        m.*,
        i.id as image_id,
        i.filename as image_filename
      FROM ${this.table} m
      LEFT JOIN images i ON m.id = i.montre_id
      ORDER BY m.created_at DESC
    `);

    // Grouper les images par montre
    const montresMap = new Map();

    rows.forEach((row) => {
      const montreId = row.id;

      if (!montresMap.has(montreId)) {
        montresMap.set(montreId, {
          id: row.id,
          name: row.name,
          brand: row.brand,
          price: row.price,
          mouvement: row.mouvement,
          materiau_boitier: row.materiau_boitier,
          couleur_cadran: row.couleur_cadran,
          bracelet: row.bracelet,
          etancheite: row.etancheite,
          description: row.description,
          referenceURL: row.referenceURL,
          created_at: row.created_at,
          images: [],
        });
      }

      // Ajouter l'image si elle existe
      if (row.image_id) {
        montresMap.get(montreId).images.push({
          id: row.image_id,
          filename: row.image_filename,
        });
      }
    });

    return Array.from(montresMap.values());
  }

  async delete(id) {
    // Supprimer les images associées
    await this.database.query("DELETE FROM images WHERE montre_id = ?", [id]);

    // Supprimer la montre
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = MontreRepository;
