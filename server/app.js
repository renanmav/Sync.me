require('dotenv').config();

const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

const session = require('express-session');
const mongoSessionStore = require('connect-mongo');

const Sentry = require('@sentry/node');
const logger = require('./logs');

const auth = require('./google');

Sentry.init({ dsn: process.env.SENTRY_DSN });

mongoose.connect(
  `mongodb://${process.env.MONGO_URL}/smarthome`,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true },
);

const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(Sentry.Handlers.requestHandler());

  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 * 1000,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };

  server.use(session(sess));

  auth({ server });

  server.get('*', (req, res) => handle(req, res));

  server.use(Sentry.Handlers.errorHandler());

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});
