// server/models/imageRepository.js
const AbstractRepository = require("./AbstractRepository");

class ImageRepository extends AbstractRepository {
  constructor() {
    super({ table: "images" });
  }

  async create(image) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (montre_id, filename) VALUES (?, ?)`,
      [image.montre_id, image.filename]
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

  // ✅ la méthode manquante
  async readByMontreId(montreId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE montre_id = ?`,
      [montreId]
    );
    return rows;
  }
}

module.exports = new ImageRepository();
