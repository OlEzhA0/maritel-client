const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorsSchema = new Schema({
  name: String,
  link: String,
})

module.exports = mongoose.model('colors', colorsSchema);