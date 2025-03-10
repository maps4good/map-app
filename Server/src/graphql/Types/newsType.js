const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

const NewsType = new GraphQLObjectType({
  name: 'News',
  fields: () => {
    const LocationType = require('./locationType');
    const CategoryType = require('./categoryType');
    return {
      news_id: { type: GraphQLID },
      source: { type: GraphQLString },
      time_published: { type: GraphQLString },
      author: { type: GraphQLString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      url: { type: GraphQLString },
      url_image: { type: GraphQLString },
      content: { type: GraphQLString },
      location_id: { type: GraphQLID },
      location: { type: LocationType },
      categories: { type: new GraphQLList(CategoryType) }
    };
  }
});

module.exports = NewsType;