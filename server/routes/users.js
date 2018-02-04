"use strict";

/** Imports */
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

/** Helper Funcions */
const parseUser = function parseReqBodyIntoUserDocument(req) {
  const rb = req.body;
  return {
    "name": rb.name,
    "avatars": {
      "small": "./images/bird.png",
      "regular": "./images/bird.png",
      "large": "./images/bird.png"
    },
    "handle": (rb.handle.startsWith('@') ? '' : '@') + rb.handle,
    "password": bcrypt.hashSync(rb.password, BCRYPT_SALT_ROUNDS)
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

  router.post("/login", (req, res) => {
    const handle = (req.body.handle.startsWith('@') ? '' : '@') + req.body.handle;
    DataHelpers.getUserByHandle(handle, (err, user) => {
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(403).send('Invalid email and/or password!');
      } else {
        req.session.userId = user._id;
        res.status(200).send('logged in');
      }
    });
  });

  router.post("/users", (req, res) => {
    if (!req.body.handle) {
      res.status(400).send('Please provide a handle (e.g. @Example)');
    } else if (!req.body.password) {
      res.status(400).send('Please provide a password');
    } else if (!req.body.name) {
      res.status(400).send('Please provide a name');
    } else {
      const userData = parseUser(req);
      DataHelpers.getUserByHandle(userData.handle, (err, user) => {
        if (user) {
          res.status(400).send("That handle has already been taken");
        } else {
          DataHelpers.createUser(userData, (err, user) => {
            req.session.userId = user.insertedId;
            res.status(200).send('registered');
          });
        }
      });
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).send('logged out');
  });

  return router;
};
