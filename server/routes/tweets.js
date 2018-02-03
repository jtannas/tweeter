"use strict";

/** Imports */
const express = require('express');
const userHelper = require("../util/user-helper");

/** Helper Functions */
const user = req => req.body.user ? req.body.user : userHelper.generateRandomUser();

const errHandler = function internalServerErrorHandler(err, req, res) {
  if (err) {
    res.status(500).json({ error: err.message });
    return true;
  }
  return false;
};

const tweetInvalidHandler = function tweetInvalidErrorHandler(req, res) {
  const validationErrors = [];
  if (!req.body.text) { validationErrors.push('invalid request: no data in POST body'); }

  if (validationErrors.length) {
    res.status(400).json({ errors: validationErrors });
    return true;
  }
  return false;
};

const parseTweet = function parseReqBodyIntoTweetDocument(req) {
  return {
    user: user(req),
    content: {
      text: req.body.text
    },
    createdAt: Date.now(),
    likers: []
  };
};


/** Route Factory */
module.exports = function(DataHelpers) {

  const tweetsRoutes = express.Router();

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      err ? errHandler(err, req, res) : res.json(tweets);
    });
  });

  tweetsRoutes.get("/:tweetId", function(req, res) {
    DataHelpers.getTweet(req.params.tweetId, (err, tweet) => {
      err ? errHandler(err, req, res) : res.status(200).json(tweet);
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!tweetInvalidHandler(req, res)) {
      DataHelpers.saveTweet(parseTweet(req), (err) => {
        err ? errHandler(err, req, res) : res.status(201).send();
      });
    }
  });

  tweetsRoutes.patch("/:tweetId", function(req, res) {
    DataHelpers.likeTweet(req.params.tweetId, user(req), (err, tweet) => {
      err ? errHandler(err, req, res) : res.status(200).json(tweet);
    });
  });
  return tweetsRoutes;
};
