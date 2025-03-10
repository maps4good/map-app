const NewsDAO = require('../daos/newsDAO');
const CategoryDAO = require('../daos/categoryDAO');
const LocationDAO = require('../daos/locationDAO');

class NewsService {
  async getNews(args = {}) {
    return await NewsDAO.getNews(args);
  }
  
  async getNewsById(id) {
    return await NewsDAO.getNewsById(id);
  }
  
  async getNewsByCategoryType(type) {
    return await NewsDAO.getNewsByCategoryType(type);
  }

  async createNews(newsData) {
    // Process location if provided as an object
    if (newsData.location && typeof newsData.location === 'object') {
      const locationId = await LocationDAO.findOrCreateLocation(newsData.location);
      newsData.location_id = locationId;
    }
    
    // Create the news article
    const newsId = await NewsDAO.createNews(newsData);
    
    // Process categories if provided
    if (newsData.categories && Array.isArray(newsData.categories)) {
      await CategoryDAO.updateNewsCategories(newsId, newsData.categories);
    }
    
    return this.getNewsById(newsId);
  }
  
  async updateNews(id, newsData) {
    // Process location if provided as an object
    if (newsData.location && typeof newsData.location === 'object') {
      const locationId = await LocationDAO.findOrCreateLocation(newsData.location);
      newsData.location_id = locationId;
    }
    
    // Update the news article
    await NewsDAO.updateNews(id, newsData);
    
    // Process categories if provided
    if (newsData.categories && Array.isArray(newsData.categories)) {
      await CategoryDAO.updateNewsCategories(id, newsData.categories);
    }
    
    return this.getNewsById(id);
  }
  
  async deleteNews(id) {
    return await NewsDAO.deleteNews(id);
  }
  
  async getCount() {
    return await NewsDAO.getCount();
  }
}

module.exports = new NewsService();