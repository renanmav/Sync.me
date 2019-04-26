/* eslint-disable class-methods-use-this */
/* eslint-disable import/order */
require('dotenv').config();
require('./logs');

const Sentry = require('@sentry/node');

const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

const session = require('express-session');
const sess = require('./session');

const auth = require('./google');

Sentry.init({ dsn: process.env.SENTRY_DSN });

mongoose.connect(
  `mongodb://${process.env.MONGO_URL}/smarthome`,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true },
);

const port = process.env.ROOT_PORT || 8000;
const ROOT_URL = `${process.env.ROOT_URL}:${port}`;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(Sentry.Handlers.requestHandler());

  server.use(session(sess));

  auth({ server });

  server.get('*', (req, res) => handle(req, res));

  server.use(Sentry.Handlers.errorHandler());

  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.logger.info(`> Ready on ${ROOT_URL}`);
  });
});
