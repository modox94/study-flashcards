/* eslint-disable no-underscore-dangle */
const express = require('express');
const Deck = require('../models/Deck.model');
const User = require('../models/User.model');
const Game = require('../models/Game.model');

const router = express.Router();

router.get('', (req, res) => {
  res.render('index');
});

router.post('/profile', async (req, res) => {
  const nameOfUser = req.body.login;
  const findUser = await User.find({
    name: nameOfUser.toLowerCase(),
  });

  if (findUser.length > 0) {
    return res.redirect(`/profile/${findUser[0]._id}`);
  }
  const newUser = new User({
    name: nameOfUser.toLowerCase(),
  });
  await newUser.save();
  return res.redirect(`/profile/${newUser._id}`);
});

router.get('/profile/:id', async (req, res) => {
  const idOfUser = req.params.id;
  const userInfo = await User.findById(idOfUser);
  const allDecks = await Deck.find();
  const oldGames = await Game.find({
    user: idOfUser,
  }).populate('deck');

  if (oldGames.length) {
    oldGames.forEach((game) => {
      game.normData = game.date.toLocaleDateString('en-GB');
      game.isDone = game.deck.cards.length === game.counterTrueAnswer.length;
    });
  }

  res.render('profile', {
    userInfo,
    idOfUser,
    allDecks,
    oldGames,
  });
});

module.exports = router;
