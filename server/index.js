"use strict";

/** Imports */
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const dataHelpersFactory = require("./lib/data-helpers.js");
const tweetsRoutesFactory = require("./routes/tweets");


/** Settings */
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const APP_PORT = 8080;


/** App Factory Function*/
const createApp = function createAndConfigWebServer(path, routes, staticDir = "public") {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(staticDir));
  app.use(path, routes);

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
  const tweetsRoutes = tweetsRoutesFactory(dataHelpers);
  createApp("/tweets", tweetsRoutes).listen(APP_PORT, () => {
    console.log("Tweeter listening on port " + APP_PORT);
  });
});
