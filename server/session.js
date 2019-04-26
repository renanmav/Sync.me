const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const mongoose = require('mongoose');

const MongoStore = mongoSessionStore(session);

const sess = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60 * 1000, // 14 days
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000,
  },
};

module.exports = sess;
