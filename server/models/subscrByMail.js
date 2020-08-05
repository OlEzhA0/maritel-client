const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscrByMain = new Schema({
  email: { type: String, unique: true },
});

module.exports = mongoose.model('subscrMail', subscrByMain);