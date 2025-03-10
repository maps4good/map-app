const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const systemController = require('../controllers/systemController');
const categoryController = require('../controllers/categoryController');
const locationController = require('../controllers/locationController');
// Content management routes
router.post('/news', newsController.createNews.bind(newsController));
router.put('/news/:id', newsController.updateNews.bind(newsController));
router.delete('/news/:id', newsController.deleteNews.bind(newsController));

// Data ingestion route - main focus
router.post('/news/import', newsController.importNews.bind(newsController));

// Admin dashboard
router.get('/admin/stats', systemController.getSystemStats.bind(systemController));

// Categories routes for testing api
router.get('/categories', categoryController.getCategories.bind(categoryController));

// Location routes for testing api
router.get('/locations', locationController.getLocations.bind(locationController));
module.exports = router;