// server/database/models/montreRepository.js
const AbstractRepository = require("./AbstractRepository");

class MontreRepository extends AbstractRepository {
  constructor() {
    super({ table: "montres" });
  }

  // ✅ Création d’une montre
  async create(montre) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (
        reference,
        brand,
        type,
        type_de_mouvement,
        origine_mouvement,
        price,
        mouvement,
        materiau_boitier,
        couleur_cadran,
        bracelet,
        resistance_eau,
        description,
        referenceURL
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        montre.reference,
        montre.brand,
        montre.type,
        montre.type_de_mouvement,
        montre.origine_mouvement,
        montre.price,
        montre.mouvement,
        montre.materiau_boitier,
        montre.couleur_cadran,
        montre.bracelet,
        montre.resistance_eau,
        montre.description,
        montre.referenceURL,
      ]
    );
    return result.insertId;
  }

  // ✅ Lire une montre complète avec ses images triées
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT 
         m.*, 
         i.id AS image_id, 
         i.filename AS image_filename, 
         i.position
       FROM ${this.table} m
       LEFT JOIN images i ON m.id = i.montre_id
       WHERE m.id = ?
       ORDER BY i.position ASC, i.id ASC`,
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
      price: rows[0].price,
      mouvement: rows[0].mouvement,
      materiau_boitier: rows[0].materiau_boitier,
      couleur_cadran: rows[0].couleur_cadran,
      bracelet: rows[0].bracelet,
      resistance_eau: rows[0].resistance_eau,
      description: rows[0].description,
      referenceURL: rows[0].referenceURL,
      created_at: rows[0].created_at,
      images: [],
    };

    rows.forEach((row) => {
      if (row.image_id) {
        montre.images.push({
          id: row.image_id,
          filename: row.image_filename,
          position: row.position,
        });
      }
    });

    return montre;
  }

  // ✅ Lire toutes les montres (avec leur image principale)
  async readAll() {
    const [rows] = await this.database.query(`
      SELECT 
        m.id,
        m.reference,
        m.brand,
        m.type,
        m.type_de_mouvement,
        m.origine_mouvement,
        m.price,
        m.mouvement,
        m.materiau_boitier,
        m.couleur_cadran,
        m.bracelet,
        m.resistance_eau,
        m.description,
        m.referenceURL,
        m.created_at,
        i.id AS image_id,
        i.filename,
        i.position
      FROM montres AS m
      LEFT JOIN images AS i ON m.id = i.montre_id
      ORDER BY m.id DESC, i.position ASC
    `);

    const montresMap = new Map();

    rows.forEach((row) => {
      if (!montresMap.has(row.id)) {
        montresMap.set(row.id, {
          id: row.id,
          reference: row.reference,
          brand: row.brand,
          type: row.type,
          type_de_mouvement: row.type_de_mouvement,
          origine_mouvement: row.origine_mouvement,
          price: row.price,
          mouvement: row.mouvement,
          materiau_boitier: row.materiau_boitier,
          couleur_cadran: row.couleur_cadran,
          bracelet: row.bracelet,
          resistance_eau: row.resistance_eau,
          description: row.description,
          referenceURL: row.referenceURL,
          created_at: row.created_at,
          images: [],
        });
      }

      if (row.image_id) {
        montresMap.get(row.id).images.push({
          id: row.image_id,
          filename: row.filename,
          position: row.position,
        });
      }
    });

    return Array.from(montresMap.values());
  }

  // ✅ Lire une montre avec toutes ses images triées
  async readWithImages(id) {
    const [rows] = await this.database.query(
      `SELECT 
         m.*, 
         i.id AS image_id, 
         i.filename, 
         i.position 
       FROM ${this.table} AS m
       LEFT JOIN images AS i ON i.montre_id = m.id
       WHERE m.id = ?
       ORDER BY i.position ASC, i.created_at ASC`,
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
      price: rows[0].price,
      mouvement: rows[0].mouvement,
      materiau_boitier: rows[0].materiau_boitier,
      couleur_cadran: rows[0].couleur_cadran,
      bracelet: rows[0].bracelet,
      resistance_eau: rows[0].resistance_eau,
      description: rows[0].description,
      referenceURL: rows[0].referenceURL,
      created_at: rows[0].created_at,
      images: rows
        .filter((r) => r.image_id)
        .map((r) => ({
          id: r.image_id,
          filename: r.filename,
          position: r.position,
        })),
    };

    return montre;
  }

  // ✅ Mise à jour d’une montre
  async update(id, data) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}
       SET 
         reference = ?,
         brand = ?,
         type = ?,
         type_de_mouvement = ?,
         origine_mouvement = ?,
         price = ?,
         mouvement = ?,
         materiau_boitier = ?,
         couleur_cadran = ?,
         bracelet = ?,
         resistance_eau = ?,
         description = ?,
         referenceURL = ?
       WHERE id = ?`,
      [
        data.reference,
        data.brand,
        data.type,
        data.type_de_mouvement,
        data.origine_mouvement,
        data.price,
        data.mouvement,
        data.materiau_boitier,
        data.couleur_cadran,
        data.bracelet,
        data.resistance_eau,
        data.description,
        data.referenceURL,
        id,
      ]
    );

    return result;
  }
  
  // ✅ Suppression d’une montre par ID
async delete(id) {
  try {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  } catch (error) {
    console.error("❌ Erreur suppression montre :", error);
    throw error;
  }
}

}

module.exports = MontreRepository;
