const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuid = require("uuid");
const autoIncrement = require("mongoose-auto-increment");

const ordersSchema = new Schema({
    orderId: Number,
    uuid: { type: String, unique: true, default: uuid.v4 },
    items: [
        {
            prodUuid: String,
            name: String,
            size: String,
            quantity: Number,
            price: Number,
        },
    ],
    date: { type: Date, default: Date.now },
    receiver: {
        firstName: String,
        lastName: String,
        patronymic: String,
        phone: String,
    },
    payer: {
        firstName: String,
        lastName: String,
        phone: String,
    },
    city: {
        value: String,
        name: String,
    },
    customReceiver: Boolean,
    paymentMethod: String,
    paymentService: String,
    shippingAddress: {
        street: {
            value: String,
            name: String,
        },
        appartment: String,
        houseNumber: String,
        value: String,
        name: String,
    },
    shippingMethod: String,
    amount: Number,
    discount: Number,
    paymentStatus: String,
    customer: { type: Schema.Types.ObjectId, ref: "customers" },
    deliveryStatus: String,
    promo: {
        promoName: String,
        promoDisc: String,
        promoValue: Number,
    },
    visited: { type: Boolean, default: false },
});

autoIncrement.initialize(mongoose.connection);

ordersSchema.plugin(autoIncrement.plugin, {
    model: "orders",
    field: "orderId",
    startAt: 1000024,
});

module.exports = mongoose.model("orders", ordersSchema, "orders");
