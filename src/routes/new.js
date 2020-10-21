const express = require('express');
const Game = require('../models/Game.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const { userId, deckId } = req.query;

  const game = new Game({
    user: userId,
    deck: deckId,
    date: new Date(),
  });

  await game.save();

  res.redirect(`/play/${game._id}`);
});

module.exports = router;
