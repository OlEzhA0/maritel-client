const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuid = require("uuid");

const ordersSchema = new Schema({
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
    date: { type: Date, default: Date.now() },
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
    customReceiver: Boolean,
    paymentMethod: String,
    shippingAddress: String,
    amount: Number,
    paymentStatus: String,
    deliveryStatus: String,
});

module.exports = mongoose.model("order", ordersSchema);
