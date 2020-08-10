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

const Product = require('../models/product');

const Category = require('../models/category');
const SpecCategs = require('../models/specCategs');
const Subscr = require('../models/subscrByMail');
const Colors = require('../models/colors')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    descr: { type: GraphQLString },
    color: { type: GraphQLString },
    price: { type: GraphQLString },
    gender: { type: GraphQLString },
    modelParam: { type: GraphQLString },
    care: { type: GraphQLString },
    composition: { type: GraphQLString },
    sizes: { type: GraphQLString },
    lastPrice: { type: GraphQLString },
    type: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    previewPhoto: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  }),
});

const SpecCategType = new GraphQLObjectType({
  name: "SpecCateg",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: { type: new GraphQLList(GraphQLString) },
  })
})

const ColorsType = new GraphQLObjectType({
  name: "Colors",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
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
    },
    product: {
      type: ProductType,
      args: { uuid: { type: GraphQLString } },
      resolve(parent, args) {
        return Product.findOne({ uuid: args.uuid, });
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({});
      },
    },
    colors: {
      type: new GraphQLList(ColorsType),
      resolve() {
        return Colors.find({})
      }
    },
  }
})

module.exports = new GraphQLSchema({
  mutation: Mutation,
  query: Query,
})