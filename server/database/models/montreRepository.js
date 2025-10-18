// server/models/montreRepository.js
const AbstractRepository = require("./AbstractRepository");

class MontreRepository extends AbstractRepository {
  constructor() {
    super({ table: "montres" });
  }

  // ✅ Création d'une montre
  async create(montre) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} 
      (reference, brand, type, type_de_mouvement, origine_mouvement, resistance_eau, bracelet, description, referenceURL, price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        montre.reference,
        montre.brand,
        montre.type,
        montre.type_de_mouvement,
        montre.origine_mouvement,
        montre.resistance_eau,
        montre.bracelet,
        montre.description,
        montre.referenceURL,
        montre.price,
      ]
    );
    return result.insertId;
  }

  // ✅ Lire une montre par ID (avec images associées)
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT m.*, i.id AS image_id, i.filename AS image_filename
       FROM ${this.table} m
       LEFT JOIN images i ON m.id = i.montre_id
       WHERE m.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    const montre = {
      id: rows[0].id,
      reference: rows[0].reference,
      brand: rows[0].brand,
      type: rows[0].type,
      type_de_mouvement: rows[0].type_de_mouvement,
      origine_mouvement: rows[0].origine_mouvement,
      resistance_eau: rows[0].resistance_eau,
      bracelet: rows[0].bracelet,
      description: rows[0].description,
      referenceURL: rows[0].referenceURL,
      price: rows[0].price,
      created_at: rows[0].created_at,
      images: [],
    };

    // Ajouter les images
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

  // ✅ Lire toutes les montres (avec leurs images)
  async readAll() {
    const [rows] = await this.database.query(`
      SELECT 
        m.*,
        i.id AS image_id,
        i.filename AS image_filename
      FROM ${this.table} m
      LEFT JOIN images i ON m.id = i.montre_id
      ORDER BY m.created_at DESC
    `);

    const montresMap = new Map();

    rows.forEach((row) => {
      const montreId = row.id;

      if (!montresMap.has(montreId)) {
        montresMap.set(montreId, {
          id: row.id,
          reference: row.reference,
          brand: row.brand,
          type: row.type,
          type_de_mouvement: row.type_de_mouvement,
          origine_mouvement: row.origine_mouvement,
          resistance_eau: row.resistance_eau,
          bracelet: row.bracelet,
          description: row.description,
          referenceURL: row.referenceURL,
          price: row.price,
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

  // ✅ Supprimer une montre et ses images
  async delete(id) {
    await this.database.query("DELETE FROM images WHERE montre_id = ?", [id]);
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = MontreRepository;
