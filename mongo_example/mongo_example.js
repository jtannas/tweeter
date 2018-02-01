"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db;
  //       starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Let's "get all the tweets". In Mongo-speak, we "find" them.
  db.collection("tweets").find({}, (err, results) => {
    // Lazy error handling:
    if (err) { throw err; }

    // We could instead just slurp the items into an array:
    results.toArray((err, resultsArray) => {
      if (err) { throw err; }

      console.log("results.toArray:", resultsArray);
    });

    // This is the end...
    db.close();
  });
});
