"use strict";

/** Imports */
const path = require('path');

require('dotenv').config();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const express = require("express");
const { MongoClient } = require("mongodb");
const nodeSassMiddleware = require('node-sass-middleware');

const dataHelpersFactory = require("./db-tools/data-helpers.js");
const tweetsRoutesFactory = require("./routes/tweets");
const userRoutesFactory = require("./routes/users");


/** Settings */
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tweeter";
const APP_PORT = process.env.PORT || 8080;
const STATIC_DIR = path.join(__dirname, "../public");
const SASS_DIR = path.join(STATIC_DIR, "sass");
const STYLES_DIR = path.join(STATIC_DIR, "styles");


/** App Factory Function*/
const createApp = function createAndConfigWebServer(router) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(nodeSassMiddleware({
    src: SASS_DIR,
    dest: STYLES_DIR,
    debug: true,
    outputStyle: 'compressed',
    prefix: '/styles/',
    indentedSyntax: true
  }));
  app.use(cookieSession({
    name: 'session',
    keys: process.env.session_keys || ['development'],
    maxAge: 24 * 60 * 60 * 1000
  }));
  app.use(express.static(STATIC_DIR));
  app.use('/', router);
  return app;
};

/** Connection Factory Function - */
const createConnection = function createAndConfigDbConnection(callback) {
  MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    console.log(`Connected to mongodb: ${MONGODB_URI}`);
    callback(db);
  });
};


/** Execute */
createConnection((db) => {
  const dataHelpers = dataHelpersFactory(db);

  const router = express.Router();
  tweetsRoutesFactory(router, dataHelpers);
  userRoutesFactory(router, dataHelpers);

  createApp(router).listen(APP_PORT, () => {
    console.log("Tweeter listening on port " + APP_PORT);
  });
});
