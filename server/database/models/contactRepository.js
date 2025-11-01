const AbstractRepository = require("./AbstractRepository");

class ContactRepository extends AbstractRepository {
  constructor() {
    super({ table: "contact_messages" }); // ou "contact" selon ton schéma exact
  }

  async create({ name, email, subject, message, ipAddress, userAgent }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, subject, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, subject, message, ipAddress || null, userAgent || null]
    );
    return result.insertId;
  }

  async getAllMessages() {
    const [rows] = await this.database.query(
      `SELECT id, name, email, subject, message, status, created_at 
       FROM ${this.table} ORDER BY created_at DESC`
    );
    return rows;
  }

  // ✅ Supprimer un message par ID (nouvelle méthode)
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = ContactRepository;
