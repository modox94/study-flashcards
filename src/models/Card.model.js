const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  question: String,
  answer: String,
});

module.exports = mongoose.model('Card', cardSchema);
