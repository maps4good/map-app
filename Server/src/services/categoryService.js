const CategoryDAO = require('../daos/categoryDAO');

class CategoryService {
  async getCategories() {
    return await CategoryDAO.getCategories();
  }
  
  async getCategoriesForNews(newsId) {
    return await CategoryDAO.getCategoriesForNews(newsId);
  }
  
  async findOrCreateCategory(categoryName) {
    return await CategoryDAO.findOrCreateCategory(categoryName);
  }
  
  async updateNewsCategories(newsId, categories) {
    return await CategoryDAO.updateNewsCategories(newsId, categories);
  }
  
  async getCount() {
    return await CategoryDAO.getCount();
  }
}

module.exports = new CategoryService();