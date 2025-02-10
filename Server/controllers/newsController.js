// src/controllers/newsController.js for rest api:
const newsService = require('../services/newsService.js');  // Import the service
class NewsController {
  constructor(newsService) {
    this.newsService = newsService;
  }

  // Get all news from the service
  async getNews(req, res) {
    try {
      console.log("fetching news with query: ", req.query);
      const news = await this.newsService.getNews(req.query);
      res.json(news);  // Send the response back to the client
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all locations from the service
  async getLocations(req, res) {
    try {
      const locations = await this.newsService.getLocations();
      res.json(locations);  // Send the response back to the client
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NewsController(newsService);
