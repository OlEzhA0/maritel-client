const mongoose = require("mongoose");
const { Schema } = mongoose;

const bannersSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "categories" },
    position: String,
    accentedText: String,
    text: String,
    title: String,
    buttonText: String,
    link: String,
    image: String,
    for: String,
});

module.exports = mongoose.model("banners", bannersSchema);
