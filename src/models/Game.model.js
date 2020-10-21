const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
  },
  date: Date,
  counterTrueAnswer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  }],
  counterFirstTrueAnswer: {
    type: Number,
    default: 0,
  },
  counterAnswer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  }],
});

module.exports = mongoose.model('Game', gameSchema);
