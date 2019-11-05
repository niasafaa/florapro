require('dotenv').config();

const express = require('express');
const passport = require('../../database/config/passport');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/seedUser', (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(401).send('Fields incomplete.');
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(() => {
    res.send('User created.');
  });
});

router.post('/getToken', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).send('Fields incomplete.');
  }
  User.forge({ email: req.body.email })
    .fetch()
    .then(result => {
      if (!result) {
        return res.status(400).send('User not found.');
      }
      console.log(result);
      result
        .authenticate(req.body.password)
        .then(user => {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: '1h'
          });
          res.send(token);
        })
        .catch(err => {
          return res.status(401).send({ err });
        });
    });
});
router.get(
  '/getUser',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send(req.user);
  }
);
router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send("i'm protected");
  }
);

module.exports = router;
