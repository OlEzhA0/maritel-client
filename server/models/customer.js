const mongoose = require("mongoose");
const { Schema } = mongoose;

const customersSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    shippingMethod: {
        value: String,
        name: String,
    },
    shippingAddress: {
        street: {
            value: String,
            name: String,
        },
        houseNumber: String,
        appartment: String,
        value: String,
        name: String,
    },
    city: {
        value: String,
        name: String,
    },
    birthday: {
        day: String,
        month: String,
    },
    gender: {
        value: String,
        name: String,
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
    status: String,
    tokenVersion: { type: Number, default: 0 },
});

module.exports = mongoose.model("customers", customersSchema);
