"use strict";

/** Helper Funcions */
const parseUser = function parseReqBodyIntoUserDocument(req) {
  return {
    "name": req.body.name,
    "avatars": {
      "small": "./images/bird.png",
      "regular": "./images/bird.png",
      "large": "./images/bird.png"
    },
    "handle": req.body.handle,
    "password": req.body.password
  };
};

const errHandler = function internalServerErrorHandler(err, req, res) {
  if (err) {
    res.status(500).json({ error: err.message });
    return true;
  }
  return false;
};

/** Route Factory */
module.exports = function(router, DataHelpers) {
  router.get("/users", function(req, res) {
    DataHelpers.getUsers((err, users) => {
      err ? errHandler(err, req, res) : res.status(200).json(users);
    });
  });

  router.get("/users/:userId", function(req, res) {
    DataHelpers.getUser(req.params.userId, (err, user) => {
      err ? errHandler(err, req, res) : res.status(200).json(user);
    });
  });

  router.post("/users", function(req, res) {
    DataHelpers.createUser(parseUser(req), (err, user) => {
      err ? errHandler(err, req, res) : res.status(200).json(user);
    });
  });

  return router;
};
