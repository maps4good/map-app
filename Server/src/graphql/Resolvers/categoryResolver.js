const CategoryService = require('../../services/categoryService');

const categoryResolvers = {
  Query: {
    categories: async () => {
      return await CategoryService.getCategories();
    }
  }
};
console.log("using catResolvers.js");
module.exports = categoryResolvers;