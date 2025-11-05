// server/database/models/imageRepository.js
const AbstractRepository = require("./AbstractRepository");

class ImageRepository extends AbstractRepository {
  constructor() {
    super({ table: "images" });
  }

  // ✅ Création d'une image avec position auto
  async create(image) {
    // On récupère le nombre d’images déjà associées à cette montre
    const [countRows] = await this.database.query(
      "SELECT COUNT(*) AS count FROM images WHERE montre_id = ?",
      [image.montre_id]
    );

    // La position = nombre d’images déjà présentes (donc dernière place)
    const position =
      typeof image.position === "number" ? image.position : countRows[0].count;

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (montre_id, filename, position)
       VALUES (?, ?, ?)`,
      [image.montre_id, image.filename, position]
    );

    return result.insertId;
  }

  // ✅ Supprimer toutes les images d'une montre
  async deleteByMontreId(montreId) {
    await this.database.query(`DELETE FROM ${this.table} WHERE montre_id = ?`, [
      montreId,
    ]);
  }

  // ✅ Lire toutes les images
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // ✅ Lire toutes les images avec infos montre
  async readAllWithMontres() {
    const [rows] = await this.database.query(
      `SELECT i.*, m.reference AS montre_reference, m.brand, m.price
       FROM ${this.table} i
       JOIN montres m ON i.montre_id = m.id
       ORDER BY i.created_at DESC`
    );
    return rows;
  }

  // ✅ Lire les images d'une montre, triées par position puis date
  async readByMontreId(montreId) {
    const [rows] = await this.database.query(
      `SELECT id, filename, position 
       FROM ${this.table} 
       WHERE montre_id = ? 
       ORDER BY position ASC, created_at ASC`,
      [montreId]
    );
    return rows;
  }

  // ✅ Mettre à jour la position d'une image
  async updatePosition(imageId, position) {
    const [result] = await this.database.query(
      "UPDATE images SET position = ? WHERE id = ?",
      [position, imageId]
    );
    return result;
  }
// ✅ Lire une image spécifique par son ID

async read(imageId) {
  const [rows] = await this.database.query(
    "SELECT * FROM images WHERE id = ?",
    [imageId]
  );
  return rows[0] || null;
}

  // ✅ Supprimer une image spécifique
  async delete(imageId) {
    const [result] = await this.database.query(
      "DELETE FROM images WHERE id = ?",
      [imageId]
    );
    return result;
  }

  // ✅ Réordonner toutes les images d'une montre
  async reorderImages(montreId, imagesOrder) {
    try {
      // imagesOrder = [imageId1, imageId2, imageId3, ...]
      await Promise.all(
        imagesOrder.map((imageId, index) =>
          this.updatePosition(imageId, index)
        )
      );
      return true;
    } catch (error) {
      console.error("❌ Erreur dans reorderImages:", error);
      throw error;
    }
  }

  // ✅ Récupérer l’image principale (position = 0)
  async getMainImage(montreId) {
    const [rows] = await this.database.query(
      `SELECT id, filename, position
       FROM ${this.table}
       WHERE montre_id = ?
       ORDER BY position ASC, created_at ASC
       LIMIT 1`,
      [montreId]
    );
    return rows[0] || null;
  }
}

module.exports = new ImageRepository();
