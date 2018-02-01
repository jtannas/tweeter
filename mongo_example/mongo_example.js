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

    // So we read the fantastic manual, right?
    console.log("for each item yielded by the cursor:");
    results.each((err, item) => console.log(" ", item));

    // This is the end...
    db.close();
  });
});
