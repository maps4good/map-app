const CategoryService = require('../../services/categoryService');

const categoryResolvers = {
  Query: {
    categories: async () => {
      return await CategoryService.getCategories();
    }
  }
};
module.exports = categoryResolvers;