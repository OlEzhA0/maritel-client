const mongoose = require('mongoose');
const { Schema } = mongoose;

const basicSchema = new Schema({
  phone: String,
  mail: String,
  instagram: String,
  facebook: String,
  telegram: String
});

module.exports = mongoose.model('basic', basicSchema);