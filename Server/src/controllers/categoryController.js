const CategoryService = require('../services/categoryService');

/**
 * CategoryController handles category-related operations
 */
class CategoryController {
  /**
   * Get all categories
   * @route GET /api/admin/categories
   */
  async getCategories(req, res) {
    try {
      const categories = await CategoryService.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();