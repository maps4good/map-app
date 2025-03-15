const newsResolver = require('./newsResolver');
const locationResolver = require('./locationResolver');
const categoryResolver = require('./categoryResolver');

// Merge all resolvers
// instead of calling each and every resolver in the schema.js file, we are combining all the resolvers into one object and calling it in the schema.js file.
const resolvers = {
  Query: {
    ...newsResolver.Query,
    ...locationResolver.Query,
    ...categoryResolver.Query
  }
};
module.exports = resolvers;