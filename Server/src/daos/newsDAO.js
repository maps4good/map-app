const Database = require('../../db/db');
const News = require('../models/news');
const Category = require('../models/category');
const Location = require('../models/location');

class NewsDAO {
  constructor() {
    this.db = Database;
  }

  // Fetch news with filters
  async getNews({ location_id, category_id, limit = 10, offset = 0 }) {
    try {
      let query = `
        SELECT n.*, 
               l.neighborhood, l.city, l.county, l.region, l.country
        FROM news n
        JOIN location l ON n.location_id = l.location_id
        WHERE 1=1
      `;

      const params = {};
      
      if (location_id) {
        query += ` AND n.location_id = @location_id`;
        params.location_id = location_id;
      }
      
      if (category_id) {
        query += ` AND EXISTS (
          SELECT 1 FROM news_category nc 
          WHERE nc.news_id = n.news_id AND nc.category_id = @category_id
        )`;
        params.category_id = category_id;
      }

      query += ` 
        ORDER BY n.time_published DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `;
      
      params.limit = limit;
      params.offset = offset;

      const result = await this.db.queryNamed(query, params);
      
      // Process each news item to include its categories and location
      return Promise.all(result.map(async (row) => {
        // Create news object
        const news = new News({
          news_id: row.news_id,
          source: row.source,
          time_published: row.time_published,
          author: row.author,
          title: row.title,
          description: row.description,
          url: row.url,
          url_image: row.url_image,
          content: row.content,
          location_id: row.location_id
        });
        
        // Add location object
        news.location = new Location({
          location_id: row.location_id,
          neighborhood: row.neighborhood,
          city: row.city,
          county: row.county,
          region: row.region,
          country: row.country
        });
        
        // Add categories
        news.categories = await this.getCategoriesForNews(row.news_id);
        
        return news;
      }));
    } catch (error) {
      console.error('Error in getNews:', error);
      throw error;
    }
  }
  
  // Get a single news item by ID
  async getNewsById(id) {
    try {
      const query = `
        SELECT n.*,
               l.neighborhood, l.city, l.county, l.region, l.country
        FROM news n
        JOIN location l ON n.location_id = l.location_id
        WHERE n.news_id = ?
      `;
      
      const result = await this.db.executeQuery(query, [id]);
      if (result.length === 0) return null;
      
      const row = result[0];
      
      // Create news object
      const news = new News({
        news_id: row.news_id,
        source: row.source,
        time_published: row.time_published,
        author: row.author,
        title: row.title,
        description: row.description,
        url: row.url,
        url_image: row.url_image,
        content: row.content,
        location_id: row.location_id
      });
      
      // Add location object
      news.location = new Location({
        location_id: row.location_id,
        neighborhood: row.neighborhood,
        city: row.city,
        county: row.county,
        region: row.region,
        country: row.country
      });
      
      // Add categories
      news.categories = await this.getCategoriesForNews(id);
      
      return news;
    } catch (error) {
      console.error('Error in getNewsById:', error);
      throw error;
    }
  }

  // Get news by category type

  async getNewsByCategoryType(type) {
    try {
      const query = `
        SELECT n.*, 
               l.neighborhood, l.city, l.county, l.region, l.country
        FROM news n
        JOIN location l ON n.location_id = l.location_id
        WHERE n.news_id IN (
          SELECT news_id 
          FROM news_category 
          WHERE category_id = (
            SELECT category_id 
            FROM category 
            WHERE type = ?
          )
        )
        ORDER BY n.time_published DESC
      `;
      
      const result = await this.db.executeQuery(query, [type]);
      
      // Process each news item to include its categories and location
      return Promise.all(result.map(async (row) => {
        // Create news object
        const news = new News({
          news_id: row.news_id,
          source: row.source,
          time_published: row.time_published,
          author: row.author,
          title: row.title,
          description: row.description,
          url: row.url,
          url_image: row.url_image,
          content: row.content,
          location_id: row.location_id
        });
        
        // Add location object
        news.location = new Location({
          location_id: row.location_id,
          neighborhood: row.neighborhood,
          city: row.city,
          county: row.county,
          region: row.region,
          country: row.country
        });
        
        // Add categories
        news.categories = await this.getCategoriesForNews(row.news_id);
        
        return news;
      }));
    } catch (error) {
      console.error('Error in getNewsByCategoryType:', error);
      throw error;
    }
  }


  // Create a new news article
  async createNews(newsData) {
    try {
      const insertQuery = `
        INSERT INTO news (source, time_published, author, title, description, url, url_image, content, location_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        SELECT SCOPE_IDENTITY() AS news_id;
      `;
      
      const result = await this.db.executeQuery(insertQuery, [
        newsData.source,
        newsData.time_published || new Date(),
        newsData.author,
        newsData.title,
        newsData.description,
        newsData.url,
        newsData.url_image,
        newsData.content,
        newsData.location_id
      ]);
      
      const newsId = result[0].news_id;
      
      // If categories are provided, create the associations
      if (newsData.categories && newsData.categories.length > 0) {
        const categoryDAO = require('./categoryDAO');
        await categoryDAO.updateNewsCategories(newsId, newsData.categories);
      }
      
      // Return the newly created news item with full details
      return this.getNewsById(newsId);
    } catch (error) {
      console.error('Error in createNews:', error);
      throw error;
    }
  }

  // Update an existing news article
  async updateNews(id, newsData) {
    try {
      const updateQuery = `
        UPDATE news
        SET source = ?, time_published = ?, author = ?, title = ?, 
            description = ?, url = ?, url_image = ?, content = ?, location_id = ?
        WHERE news_id = ?;
      `;
      
      await this.db.executeQuery(updateQuery, [
        newsData.source,
        newsData.time_published,
        newsData.author,
        newsData.title,
        newsData.description,
        newsData.url,
        newsData.url_image,
        newsData.content,
        newsData.location_id,
        id
      ]);
      
      // Update categories if provided
      if (newsData.categories) {
        const categoryDAO = require('./categoryDAO');
        await categoryDAO.updateNewsCategories(id, newsData.categories);
      }
      
      return this.getNewsById(id);
    } catch (error) {
      console.error('Error in updateNews:', error);
      throw error;
    }
  }

  // Delete a news article
  async deleteNews(id) {
    try {
      // First delete related records in news_category
      await this.db.executeQuery('DELETE FROM news_category WHERE news_id = ?', [id]);
      
      // Then delete the news article
      const result = await this.db.executeQuery('DELETE FROM news WHERE news_id = ?', [id]);
      return result.rowsAffected > 0;
    } catch (error) {
      console.error('Error in deleteNews:', error);
      throw error;
    }
  }

  // Get categories for a news item (helper method)
  async getCategoriesForNews(newsId) {
    try {
      const query = `
        SELECT c.category_id, c.type 
        FROM category c
        JOIN news_category nc ON c.category_id = nc.category_id
        WHERE nc.news_id = ?
      `;
      
      const categories = await this.db.executeQuery(query, [newsId]);
      // Return Category model instances instead of just strings
      return categories.map(row => new Category(row));
    } catch (error) {
      console.error(`Error getting categories for news ${newsId}:`, error);
      return [];
    }
  }

  // Get count of news articles
  async getCount() {
    try {
      const result = await this.db.executeQuery('SELECT COUNT(*) AS count FROM news');
      return result[0].count;
    } catch (error) {
      console.error('Error in getCount:', error);
      throw error;
    }
  }
  
  // Get news statistics by location
  async getNewsByLocation() {
    try {
      const query = `
        SELECT l.location_id, l.city, l.region, l.country, COUNT(n.news_id) as news_count
        FROM location l
        LEFT JOIN news n ON l.location_id = n.location_id
        GROUP BY l.location_id, l.city, l.region, l.country
        ORDER BY news_count DESC
      `;
      
      const results = await this.db.executeQuery(query);
      
      // Return data with Location model instances
      return results.map(row => {
        return {
          location: new Location({
            location_id: row.location_id,
            city: row.city,
            region: row.region,
            country: row.country
          }),
          news_count: row.news_count
        };
      });
    } catch (error) {
      console.error('Error in getNewsByLocation:', error);
      throw error;
    }
  }
}

module.exports = new NewsDAO();