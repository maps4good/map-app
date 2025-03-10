
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } = require('graphql');

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    category_id: { type: GraphQLID },
    type: { type: GraphQLString }
  }
});

module.exports = CategoryType;