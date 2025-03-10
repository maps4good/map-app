const newsResolver = require('./newsResolver');
const locationResolver = require('./locationResolver');
const categoryResolver = require('./categoryResolver');

// Merge all resolvers
const resolvers = {
  Query: {
    ...newsResolver.Query,
    ...locationResolver.Query,
    ...categoryResolver.Query
  }
};
console.log("using resolvers.js");

module.exports = resolvers;