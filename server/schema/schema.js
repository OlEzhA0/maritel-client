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
const Subscr = require('../models/subscrByMail')

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

const SubscribeType = new GraphQLObjectType({
  name: "SubscribeByMail",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSubscribe: {
      type: SubscribeType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { email }) {
        const sub = new Subscr({
          email
        })

        sub.save()
      }
    }
  }
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
  mutation: Mutation,
  query: Query,
})