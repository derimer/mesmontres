// server/models/imageRepository.js
const AbstractRepository = require("./AbstractRepository");

class ImageRepository extends AbstractRepository {
  constructor() {
    super({ table: "images" });
  }

  async create(image) {
  // Solution robuste : compter le nombre total d'images existantes
  const [countRows] = await this.database.query(
    "SELECT COUNT(*) as count FROM images WHERE montre_id = ?",
    [image.montre_id]
  );
  
  const position = countRows[0].count;

  const [result] = await this.database.query(
    `INSERT INTO ${this.table} (montre_id, filename, position)
     VALUES (?, ?, ?)`,
    [image.montre_id, image.filename, position]
  );

  return result.insertId;
}


  async deleteByMontreId(montreId) {
    await this.database.query(`DELETE FROM ${this.table} WHERE montre_id = ?`, [
      montreId,
    ]);
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async readAllWithMontres() {
    const [rows] = await this.database.query(
      `SELECT i.*, m.name AS montre_name, m.brand, m.price
       FROM ${this.table} i
       JOIN montres m ON i.montre_id = m.id`
    );
    return rows;
  }

  // ✅ Lire les images d'une montre triées par position
  async readByMontreId(montreId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE montre_id = ? ORDER BY position ASC, created_at ASC`,
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

  // ✅ Supprimer une image spécifique
  async delete(imageId) {
    const [result] = await this.database.query(
      "DELETE FROM images WHERE id = ?",
      [imageId]
    );
    return result;
  }

  // ✅ Réorganiser toutes les images d'une montre
  async reorderImages(montreId, imagesOrder) {
    try {
      // Mettre à jour la position de chaque image
      await Promise.all(
        imagesOrder.map(async (imageId, index) => {
          await this.updatePosition(imageId, index);
        })
      );
      return true;
    } catch (error) {
      console.error("❌ Erreur dans reorderImages:", error);
      throw error;
    }
  }

  // ✅ Récupérer l'image principale (position 0) d'une montre
  async getMainImage(montreId) {
    const [rows] = await this.database.query(
      "SELECT * FROM images WHERE montre_id = ? AND position = 0 ORDER BY created_at ASC LIMIT 1",
      [montreId]
    );
    return rows[0] || null;
  }
}

module.exports = new ImageRepository();