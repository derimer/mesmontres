 class AdminRepository {
  constructor(db) {
    this.db = db;
  }

  async findAdmin() {
    const [rows] = await this.db.query("SELECT * FROM admin LIMIT 1");
    return rows[0] || null;
  }

  async createAdmin(passwordHash) {
    await this.db.query(
      "INSERT INTO admin (password_hash) VALUES (?)",
      [passwordHash]
    );
  }
}

module.exports = AdminRepository;
