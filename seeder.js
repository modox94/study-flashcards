const faker = require('faker');
const dbConnect = require('./src/models/db');
const User = require('./src/models/User.model');
const Deck = require('./src/models/Deck.model');
const Card = require('./src/models/Card.model');
const Game = require('./src/models/Game.model');

dbConnect();
async function seed() {
  const arrCard = [];

  const newUser = new User({
    name: faker.name.findName(),
  });

  for (let i = 0; i < 6; i += 1) {
    const newCard = new Card({
      question: faker.lorem.sentence(),
      answer: faker.lorem.word(),
    });
    arrCard.push(newCard._id);
    await newCard.save();
  }

  const newDeck = new Deck({
    name: faker.lorem.word(),
    cards: arrCard,
  });
  await newDeck.save();

  const newGame = new Game({
    user: newUser._id,
    deck: newDeck._id,
    date: new Date(),
    counterTrueAnswer: [],
    counterFirstTrueAnswer: 0,
    counterAnswer: [],
  });
  await newGame.save();

  newUser.games.push(newGame._id);
  await newUser.save();
}

seed();
