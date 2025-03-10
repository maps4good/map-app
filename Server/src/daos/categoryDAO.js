const Database = require('../../db/db');
const Category = require('../models/category');

class CategoryDAO {
  constructor() {
    this.db = Database;
  }

  // Get all categories
  async getCategories() {
    try {
      const results = await this.db.executeQuery('SELECT * FROM category');
      // Convert to Category model instances
      return results.map(row => new Category(row));
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }

  // Get categories for a specific news article
  async getCategoriesForNews(newsId) {
    try {
      const query = `
        SELECT c.category_id, c.type 
        FROM category c
        JOIN news_category nc ON c.category_id = nc.category_id
        WHERE nc.news_id = ?
      `;
      
      const categories = await this.db.executeQuery(query, [newsId]);
      // Convert to Category model instances
      return categories.map(row => new Category(row));
    } catch (error) {
      console.error(`Error getting categories for news ${newsId}:`, error);
      return [];
    }
  }

  // Find or create a category by name
  async findOrCreateCategory(categoryName) {
    try {
      const existingCategory = await this.db.executeQuery(
        'SELECT category_id FROM category WHERE type = ?',
        [categoryName]
      );
      
      if (existingCategory.length > 0) {
        return existingCategory[0].category_id;
      }
      
      const newCategory = await this.db.executeQuery(
        'INSERT INTO category (type) VALUES (?); SELECT SCOPE_IDENTITY() AS category_id;',
        [categoryName]
      );
      
      return newCategory[0].category_id;
    } catch (error) {
      console.error('Error in findOrCreateCategory:', error);
      throw error;
    }
  }

  // Update categories for a news article
  async updateNewsCategories(newsId, categories) {
    try {
      // Delete existing category relationships
      await this.db.executeQuery('DELETE FROM news_category WHERE news_id = ?', [newsId]);
      
      if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return;
      }
      
      // Add new category relationships
      for (const categoryName of categories) {
        const categoryId = await this.findOrCreateCategory(categoryName);
        await this.db.executeQuery(
          'INSERT INTO news_category (news_id, category_id) VALUES (?, ?)',
          [newsId, categoryId]
        );
      }
    } catch (error) {
      console.error('Error in updateNewsCategories:', error);
      throw error;
    }
  }

  // Get count of categories
  async getCount() {
    try {
      const result = await this.db.executeQuery('SELECT COUNT(*) AS count FROM category');
      return result[0].count;
    } catch (error) {
      console.error('Error in getCount:', error);
      throw error;
    }
  }
  
  // Get a category by ID
  async getCategoryById(id) {
    try {
      const results = await this.db.executeQuery(
        'SELECT * FROM category WHERE category_id = ?',
        [id]
      );
      
      if (results.length === 0) {
        return null;
      }
      
      // Return a new Category model instance
      return new Category(results[0]);
    } catch (error) {
      console.error(`Error getting category with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = new CategoryDAO();