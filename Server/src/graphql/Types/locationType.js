const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } = require('graphql');

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    location_id: { type: GraphQLID },
    neighborhood: { type: GraphQLString },
    city: { type: GraphQLString },
    county: { type: GraphQLString },
    region: { type: GraphQLString },
    country: { type: GraphQLString },
  }
});

module.exports = LocationType;