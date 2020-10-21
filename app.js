require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const dbConnect = require('./src/models/db');
const indexRouter = require('./src/routes/index');
const playRouter = require('./src/routes/play');
const newRouter = require('./src/routes/new');
const gameRouter = require('./src/routes/game');
const tryRouter = require('./src/routes/try');
const Deck = require('./src/models/Deck.model');
const Game = require('./src/models/Game.model');
const User = require('./src/models/User.model');
const Card = require('./src/models/Card.model');

const app = express();

const PORT = process.env.PORT || 3001;

dbConnect();

// Settings for HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'));

// Midlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', indexRouter);
app.use('/play', playRouter);
app.use('/new', newRouter);
app.use('/game', gameRouter);
app.use('/try', tryRouter);

// Page 404
app.use((req, res) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log('Server has been started ', PORT);
});
