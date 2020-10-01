const mongoose = require("mongoose");
const { Schema } = mongoose;

const autoIncrement = require("mongoose-auto-increment");

const productSubscribersSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    product: { type: Schema.Types.ObjectId, ref: "products" },
    size: String,
    productSubscriberId: Number,
    date: { type: Date, default: Date.now },
    subscribe: Boolean,
    newSubscriber: { type: Boolean, default: true },
});

autoIncrement.initialize(mongoose.connection);

productSubscribersSchema.plugin(autoIncrement.plugin, {
    model: "productSubscribers",
    field: "productSubscriberId",
    startAt: 1,
});

module.exports = mongoose.model("productSubscribers", productSubscribersSchema);
