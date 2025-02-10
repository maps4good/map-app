require('dotenv').config();
// console.log("Loaded Environment Variables:");
// console.log("DB Name:", process.env.DB_NAME);
// console.log("DB Server:", process.env.DB_SERVER);
// console.log("DB User:", process.env.DB_USER);
// console.log("DB Password:", process.env.DB_PASSWORD ? "******" : "Not Set");
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Set to true if using Azure MSSQL
    trustServerCertificate: true
  }
};
// console.log('Database configuration:', config.database);
class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    if (!this.pool) {
      try {
        this.pool = await sql.connect(config);
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
      }
    }
    return this.pool;
  }
}

module.exports = new Database();
