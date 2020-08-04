const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema({
  category: String,
  subCategories: String,
})

module.exports = mongoose.model('categories', categoriesSchema);