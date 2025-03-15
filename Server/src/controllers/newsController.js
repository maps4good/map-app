const NewsService = require('../services/newsService');

class NewsController {
  // For admin/CMS content creation
  async createNews(req, res) {
    try {
      const news = await NewsService.createNews(req.body);
      res.status(201).json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // For content corrections/updates
  async updateNews(req, res) {
    try {
      const news = await NewsService.updateNews(req.params.id, req.body);
      if (!news) {
        return res.status(404).json({ error: 'News item not found' });
      }
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // For content removal
  async deleteNews(req, res) {
    try {
      const success = await NewsService.deleteNews(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'News item not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new NewsController();