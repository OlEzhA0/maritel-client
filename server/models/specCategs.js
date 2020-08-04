const mongoose = require('mongoose');
const { Schema } = mongoose;

const specCategoriesSchema = new Schema({
  name: { type: String, unique: true },
  products: [String],
});

module.exports = mongoose.model('specCategories', specCategoriesSchema);