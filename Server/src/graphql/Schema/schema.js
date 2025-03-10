const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLID } = require('graphql');
const NewsType = require('../Types/newsType.js');
const LocationType = require('../Types/locationType.js');
const CategoryType = require('../Types/categoryType.js');
const resolvers = require('../Resolvers/resolvers.js');

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // News queries
    news: {
      type: new GraphQLList(NewsType),
      args: {
        location_id: { type: GraphQLID },
        category_id: { type: GraphQLID },
        category_type: { type: GraphQLString },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve: resolvers.Query.news
    },
    //newsById(id: Int!): News
    newsById: {
      type: NewsType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: resolvers.Query.newsById
    },
    //newsByCategory(type: String!): [News]
    newsByCategoryType: {
      type: new GraphQLList(NewsType),
      args: {
        type: { type: GraphQLString }
      },
      resolve: resolvers.Query.newsByCategoryType
    },
    
    // Location queries
    locations: {
      type: new GraphQLList(LocationType),
      resolve: resolvers.Query.locations
    },
    locationById: {
      type: LocationType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: resolvers.Query.locationById
    },
    
    // Category queries
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: resolvers.Query.categories
    }
  }
});

// Create and Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery
});