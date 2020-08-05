const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  uuid: { type: String, unique: true },
  title: String,
  descr: String,
  gender: String,
  color: String,
  price: String,
  modelParam: String,
  care: String,
  composition: String,
  sizes: String,
  lastPrice: String,
  type: String,
  timestamp: String,
  photos: [String],
  previewPhoto: String,
});

module.exports = mongoose.model('products', commentSchema);