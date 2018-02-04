"use strict";

/** Helper Functions */
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
  if (!req.session.userId) { validationErrors.push('invalid request: no user id'); }

  if (validationErrors.length) {
    res.status(400).json({ errors: validationErrors });
    return true;
  }
  return false;
};

const parseTweet = function parseReqBodyIntoTweetDocument(req) {
  return {
    user: req.session.userId,
    content: {
      text: req.body.text
    },
    createdAt: Date.now(),
    likers: []
  };
};


/** Route Factory */
module.exports = function(router, DataHelpers) {

  router.get("/tweets/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      err ? errHandler(err, req, res) : res.json(tweets);
    });
  });

  router.get("/tweets/:tweetId", function(req, res) {
    DataHelpers.getTweet(req.params.tweetId, (err, tweet) => {
      err ? errHandler(err, req, res) : res.status(200).json(tweet);
    });
  });

  router.post("/tweets/", function(req, res) {
    if (!tweetInvalidHandler(req, res)) {
      DataHelpers.saveTweet(parseTweet(req), (err) => {
        err ? errHandler(err, req, res) : res.status(201).send();
      });
    }
  });

  router.patch("/tweets/:tweetId/like", function(req, res) {
    if (!req.session.userId) {
      res.status(401).send('You must be logged in to like tweets');
    } else {
      DataHelpers.likeTweet(req.params.tweetId, req.session.userId, (err, tweet) => {
        err ? errHandler(err, req, res) : res.status(200).json(tweet);
      });
    }
  });

  return router;
};
