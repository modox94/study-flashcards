require('dotenv').config();
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

const { DB_NAME, DB_LOGIN, DB_PASS } = process.env;

const dbConnectionURL = `mongodb+srv://${DB_LOGIN}:${DB_PASS}@cluster0.f3yi0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

function dbConnect() {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) return console.log(err);
    console.log('Success connected to mogno');
  });
}

module.exports = dbConnect;
