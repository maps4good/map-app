// src/daos/newsDao.js
const Database = require('../db/db');
const News = require('../models/newsModel');  // Use model to map data

class NewsDAO {
  constructor() {
    this.db = Database;
  }

  // Fetch news with filters
  async getNews({ location_id, category_id, limit, offset }) {
    const pool = await this.db.connect();
    let query = `
      SELECT n.news_id, n.source, n.time_published, n.author, n.title, 
             n.description, n.url, n.url_image, n.content, n.location_id
      FROM news n
      LEFT JOIN news_category nc ON n.news_id = nc.news_id
      LEFT JOIN category c ON nc.category_id = c.category_id
      WHERE 1=1
    `;

    const request = pool.request();

    if (location_id) {
        query += ` AND n.location_id = @location_id`;
        request.input('location_id', location_id); // Add input parameter 
    }
    if (category_id) {
        query += ` AND nc.category_id = @category_id`;
        request.input('category_id', category_id); // Add input parameter
    }

    query += ` 
      ORDER BY n.time_published DESC
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;

    request.input('limit', limit);
    request.input('offset', offset);

    const result = await request.query(query);
    
    // Return raw data mapped to models. recordset is provided by mssql library
    return result.recordset.map(row => new News(row));
}

  // Fetch all locations
  async getLocations() {
    const pool = await this.db.connect();
    const result = await pool.request().query('SELECT * FROM location');
    return result.recordset;
  }
}

module.exports = new NewsDAO();
