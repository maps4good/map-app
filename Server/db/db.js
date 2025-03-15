require('dotenv').config();
const db = require('msnodesqlv8');

const connectionString = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

class Database {
  constructor() {
    this.connectionString = connectionString;
    this.pool = null; 
  }

  async connect() {
    try {
      console.log(`Attempting connection to ${process.env.DB_SERVER}/${process.env.DB_NAME}`);
      console.log(await this.execute('SELECT 1 AS connected'));
      return this; // return instance of db class
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  // Fixed spelling: excuteQuery -> executeQuery
  async executeQuery(sqlQuery, params = []) {
    return new Promise((resolve, reject) => {
      db.query(this.connectionString, sqlQuery, params, (err, rows) => {
        if (err) {
          console.error('Query failed:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Add alias for backward compatibility
  async query(sqlQuery, params = []) {
    return this.executeQuery(sqlQuery, params);
  }

  async execute(sqlStatement, params = []) {
    return this.executeQuery(sqlStatement, params);
  }

  // helper method to replace named parameters with positional parameters
  async queryNamed(sql, params = {}) {
    const paramArray = [];
    const modifiedSql = sql.replace(/@(\w+)/g, (match, paramName) => {
      if (params[paramName] !== undefined) {
        paramArray.push(params[paramName]);
        return '?';
      }
      return match;
    });
    
    return await this.executeQuery(modifiedSql, paramArray);
  }

  async request() {
    return {
      query: async (sql, params = {}) => {
        const result = await this.queryNamed(sql, params);
        return { recordset: result };
      },
      input: function() { return this; } // For chainability
    };
  }
}

module.exports = new Database();