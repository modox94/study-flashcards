const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

module.exports = mongoose.model('User', userSchema);
