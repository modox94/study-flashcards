const express = require('express');
const Game = require('../models/Game.model');

const router = express.Router();

router.post('/', async function (req, res) {
  const currentGame = req.body;

  await Game.findByIdAndUpdate(currentGame._id, currentGame);
  res.json();
});

module.exports = router;
