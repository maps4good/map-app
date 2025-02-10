const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService'); // Import the service

// Get all news
router.get('/news', async (req, res) => {
  try {
    const news = await newsService.getNews(req.query);
    res.json(news);  // Send the response back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await newsService.getLocations();
    res.json(locations);  // Send the response back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;