const NewsService = require('../../services/newsService');
const CategoryService = require('../../services/categoryService');
const newsResolvers = {
  Query: {
    news: async (_, args) => {
      console.log("Fetching news with args:", args);
      return await NewsService.getNews(args);
    },
    
    newsById: async (_, { id }) => {
      console.log("Fetching news by ID:", id);
      return await NewsService.getNewsById(ParseInt(id));
    },
    newsByCategoryType: async (_, { type }) => {
      console.log("Fetching news by category type:", type);
      return await NewsService.getNewsByCategoryType(type);
    }
  },
  news: {
    categories: async (parent) => {
      // Fetch categories for this specific news item
      console.log("Fetching categories for news:", parent);
      return await CategoryService.getCategoriesForNews(parent.news_id);
    },
  }
};
console.log("using newsResolvers.js");

module.exports = newsResolvers;