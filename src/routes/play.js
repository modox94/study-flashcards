const express = require('express');
const Game = require('../models/Game.model');
const Deck = require('../models/Deck.model');

const router = express.Router();

router.get('/:id', async function (req, res) {
  const idGame = req.params.id;
  const currentGame = await Game.findById(idGame);
  const currentDeck = await Deck.findById(currentGame.deck).populate('cards');

  res.render('../views/play.hbs', { play: true });
});

module.exports = router;
