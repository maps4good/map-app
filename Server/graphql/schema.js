// src/graphql/schema.js
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const NewsService = require('../services/newsService.js');  // Service layer for fetching data

// Define Location Type
const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    location_id: { type: GraphQLInt },
    neighborhood: { type: GraphQLString },
    city: { type: GraphQLString },
    county: { type: GraphQLString },
    region: { type: GraphQLString },
    country: { type: GraphQLString },
  }
});

// Define News Type
const NewsType = new GraphQLObjectType({
  name: 'News',
  fields: {
    news_id: { type: GraphQLInt },
    source: { type: GraphQLString },
    time_published: { type: GraphQLString },
    author: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
    url_image: { type: GraphQLString },
    content: { type: GraphQLString },
    location: { type: LocationType },  // Nested Location object
    categories: { type: new GraphQLList(GraphQLString) }  // List of categories
  }
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    news: {
      type: new GraphQLList(NewsType),
      args: {
        location_id: { type: GraphQLInt },
        category_id: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        console.log("Fetching news with args: ", args);
        return await NewsService.getNews(args);  // Call service to fetch news
      }
    },
    location: {
      type: new GraphQLList(LocationType),
      resolve: async () => {
        return await NewsService.getLocations();  // Call service to fetch locations
      }
    }
  }
});

// Create and Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
