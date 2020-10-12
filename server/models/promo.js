const mongoose = require('mongoose');
const { Schema } = mongoose;

const promoSchema = new Schema({
  promoName: { type: String, unique: true },
  promoDisc: String,
  promoValue: String,
});

module.exports = mongoose.model('promo', promoSchema);