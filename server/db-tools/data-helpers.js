"use strict";
var ObjectID = require('mongodb').ObjectID;


// Defines helper functions for interacting with the database
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      const newId = db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get a single tweet from the db
    getTweet: function(_id, callback) {
      db.collection('tweets').findOne({ _id: new ObjectID(_id) }, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().sort({ createdAt: 1 }).toArray(callback);
    },

    // Update the likes for a single tweet
    likeTweet: function(id, likerId, callback) {
      db.collection('tweets').findOne({ _id: new ObjectID(id) }, (err, tweet) => {
        if ((tweet.user.userId !== likerId) && !tweet.likers.includes(likerId)) {
          db.collection('tweets').update({ _id: new ObjectID(id) }, { $addToSet: { 'likers': likerId } });
          callback(err, { liked: true, likers: tweet.likers.concat(likerId) });
        } else {
          db.collection('tweets').update({ _id: new ObjectID(id) }, { $pull: { likers: likerId } });
          callback(err, { liked: false, likers: tweet.likers.filter(x => x !== likerId) });
        }
      });
    },

    // Get the users from the database
    getUsers: function(callback) {
      db.collection('users').find().toArray(callback);
    },

    // Get a user from the database
    getUser: function(_id, callback) {
      db.collection('users').findOne({ _id: new ObjectID(_id) }, callback);
    },

    // Create a user in the database
    createUser: function(userData, callback) {
      db.collection('users').insertOne(userData, callback);
    },

    // Find the user for a given handle
    getUserByHandle: function(handle, callback) {
      db.collection('users').findOne({ 'handle': handle }, callback);
    }
  };
};
