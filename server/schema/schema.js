const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = graphql;

const Product = require("../models/product");

const Category = require("../models/category");
const SpecCategs = require("../models/specCategs");
const Subscr = require("../models/subscrByMail");
const Colors = require("../models/colors");
const Customer = require("../models/customer");
const Order = require("../models/order");

const ProductType = new GraphQLObjectType({
    name: "Product",
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
    }),
});

const ColorsType = new GraphQLObjectType({
    name: "Colors",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        link: { type: GraphQLString },
    }),
});

const OptionType = new GraphQLObjectType({
    name: "OptionType",
    fields: {
        value: { type: GraphQLString },
        name: { type: GraphQLString },
    },
});

const ShippingAddressType = new GraphQLObjectType({
    name: "CustomerShippingAddress",
    fields: {
        street: {
            type: OptionType,
        },
        houseNumber: { type: GraphQLString },
        appartment: { type: GraphQLString },
        value: { type: GraphQLString },
        name: { type: GraphQLString },
    },
});

const CategoriesType = new GraphQLObjectType({
    name: "Categories",
    fields: () => ({
        id: { type: GraphQLID },
        category: { type: GraphQLString },
        subCategories: { type: GraphQLString },
    }),
});

const CartItemsType = new GraphQLObjectType({
    name: "CartItems",
    fields: () => ({
        prodUuid: { type: GraphQLString },
        name: { type: GraphQLString },
        size: { type: GraphQLString },
        quantity: { type: GraphQLString },
        price: { type: GraphQLString },
    }),
});

const OrderType = new GraphQLObjectType({
    name: "Orders",
    fields: () => ({
        _id: { type: GraphQLID },
        items: { type: new GraphQLList(CartItemsType) },
        city: { type: OptionType },
        customReceiver: { type: graphql.GraphQLBoolean },
        paymentMethod: { type: GraphQLString },
        paymentService: { type: GraphQLString },
        shippingAddress: { type: ShippingAddressType },
        shippingMethod: { type: GraphQLString },
        amount: { type: GraphQLString },
        paymentStatus: { type: GraphQLString },
        customer: { type: GraphQLString },
        date: { type: GraphQLString },
    }),
});

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: {
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLString },
        city: { type: OptionType },
        birthday: {
            type: new GraphQLObjectType({
                name: "CustomerBirthday",
                fields: {
                    day: { type: GraphQLString },
                    month: { type: GraphQLString },
                },
            }),
        },
        shippingMethod: {
            type: new GraphQLObjectType({
                name: "CustomerShippingMethod",
                fields: {
                    value: { type: GraphQLString },
                    name: { type: GraphQLString },
                },
            }),
        },
        shippingAddress: { type: ShippingAddressType },
        orders: { type: new GraphQLList(OrderType) },
        gender: {
            type: new GraphQLObjectType({
                name: "CustomerGender",
                fields: {
                    value: { type: GraphQLString },
                    name: { type: GraphQLString },
                },
            }),
        },
        status: { type: GraphQLString },
    },
});

const SubscribeType = new GraphQLObjectType({
    name: "SubscribeByMail",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
    }),
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addSubscribe: {
            type: SubscribeType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { email }) {
                const sub = new Subscr({
                    email,
                });

                sub.save();
            },
        },
        EditCustomerInfo: {
            type: CustomerType,
            args: {
                _id: { type: GraphQLString },
                customer: {
                    type: new graphql.GraphQLInputObjectType({
                        name: "CustomerInput",
                        fields: {
                            email: { type: GraphQLString },
                            firstName: { type: GraphQLString },
                            lastName: { type: GraphQLString },
                            phone: { type: GraphQLString },
                            city: {
                                type: new graphql.GraphQLInputObjectType({
                                    name: "CustomerInputCity",
                                    fields: {
                                        value: { type: GraphQLString },
                                        name: { type: GraphQLString },
                                    },
                                }),
                            },
                            birthday: {
                                type: new graphql.GraphQLInputObjectType({
                                    name: "CustomerInputBirthday",
                                    fields: {
                                        day: { type: GraphQLString },
                                        month: { type: GraphQLString },
                                    },
                                }),
                            },
                            shippingMethod: {
                                type: new graphql.GraphQLInputObjectType({
                                    name: "CustomerInputShippingMethod",
                                    fields: {
                                        value: { type: GraphQLString },
                                        name: { type: GraphQLString },
                                    },
                                }),
                            },
                            shippingAddress: {
                                type: new graphql.GraphQLInputObjectType({
                                    name: "CustomerInputShippingAddress",
                                    fields: {
                                        street: {
                                            type: new graphql.GraphQLInputObjectType(
                                                {
                                                    name: "CustomerInputStreet",
                                                    fields: {
                                                        value: {
                                                            type: GraphQLString,
                                                        },
                                                        name: {
                                                            type: GraphQLString,
                                                        },
                                                    },
                                                }
                                            ),
                                        },
                                        houseNumber: { type: GraphQLString },
                                        appartment: { type: GraphQLString },
                                        value: { type: GraphQLString },
                                        name: { type: GraphQLString },
                                    },
                                }),
                            },
                            gender: {
                                type: new graphql.GraphQLInputObjectType({
                                    name: "CustomerInputGender",
                                    fields: {
                                        value: { type: GraphQLString },
                                        name: { type: GraphQLString },
                                    },
                                }),
                            },
                            status: { type: GraphQLString },
                        },
                    }),
                },
            },
            async resolve(_parent, args, context) {
                if (!context.customer) {
                    return {};
                }

                try {
                    await Customer.updateOne(
                        { _id: context.customer.customerId },
                        { ...args.customer }
                    );

                    return Customer.findOne({
                        _id: context.customer.customerId,
                    });
                } catch {
                    return {};
                }
            },
        },
    },
});

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        categories: {
            type: new GraphQLList(CategoriesType),
            resolve() {
                return Category.find({});
            },
        },
        getSpecCateg: {
            type: new GraphQLList(SpecCategType),
            resolve() {
                return SpecCategs.find({});
            },
        },
        product: {
            type: ProductType,
            args: { uuid: { type: GraphQLString } },
            resolve(_parent, args) {
                return Product.findOne({ uuid: args.uuid });
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
                return Colors.find({});
            },
        },
        customer: {
            type: CustomerType,
            resolve(_parent, _args, context) {
                if (!context.customer) {
                    return {};
                }

                return Customer.findOne({
                    _id: context.customer.customerId,
                }).populate("orders");
            },
        },
    },
});

module.exports = new GraphQLSchema({
    mutation: Mutation,
    query: Query,
});
