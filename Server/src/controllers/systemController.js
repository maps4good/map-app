const NewsService = require('../services/newsService');
const LocationService = require('../services/locationService');
const CategoryService = require('../services/categoryService');

class SystemController {
  // For admin dashboard
  async getSystemStats(req, res) {
    try {
      const [newsCount, categoryCount, locationCount] = await Promise.all([
        NewsService.getCount(),
        CategoryService.getCount(),
        LocationService.getCount()
      ]);
      
      res.json({
        news: newsCount,
        categories: categoryCount,
        locations: locationCount,
        lastUpdated: new Date()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SystemController();