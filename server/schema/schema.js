const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = graphql;


const Category = require('../models/category');
const SpecCategs = require('../models/specCategs');

const SpecCategType = new GraphQLObjectType({
  name: "SpecCateg",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: { type: new GraphQLList(GraphQLString) },
  })
})

const CategoriesType = new GraphQLObjectType({
  name: "Categories",
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    subCategories: { type: GraphQLString }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    categories: {
      type: new GraphQLList(CategoriesType),
      resolve() {
        return Category.find({})
      }
    },
    getSpecCateg: {
      type: new GraphQLList(SpecCategType),
      resolve() {
        return SpecCategs.find({})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
})