const express = require('express');
const Game = require('../models/Game.model');
const Deck = require('../models/Deck.model');
const Card = require('../models/Card.model');

const router = express.Router();

router.post('/', async function (req, res) {
  const {
    gameId,
    currentAnswerId,
  } = req.body;

  const currentGame = await Game.findById(gameId);
  const currentDeck = await Deck.findById(currentGame.deck).populate('cards');
  let currentTrueAnswer = await Card.findById(currentAnswerId);

  if (currentAnswerId) currentTrueAnswer = currentTrueAnswer.answer;

  res.json({
    currentGame,
    currentDeck,
    currentTrueAnswer,
  });
});

module.exports = router;
