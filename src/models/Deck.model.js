const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
  name: String,
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
});

module.exports = mongoose.model('Deck', deckSchema);
