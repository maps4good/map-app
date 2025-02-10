// src/services/newsService.js
const NewsDAO = require('../daos/newsDAO.js');  // DAO is imported here

class newsService {
  constructor() {
    this.newsDao = NewsDAO;  // Use DAO for data fetching
  }

  // Fetch news with filters and enrich the data
  async getNews({ location_id, category_id, limit = 10, offset = 0 }) {
    // Fetch raw data from DAO
    const newsItems = await this.newsDao.getNews({ location_id, category_id, limit, offset });

    return newsItems;  // Return enriched data if any
  }

  // Fetch all locations
  async getLocations() {
    return await this.newsDao.getLocations();
  }
}

module.exports = new newsService();
