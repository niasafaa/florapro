require('dotenv').config();

const express = require('express');
const client = require('../../database/db');

const router = express.Router();
//register user
router.post('/register', (req, res) => {
  const user = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password_digest: req.body.password
  };

  client.query(
    'INSERT INTO users (first_name, last_name, username, email, password_digest) VALUES ($1, $2, $3, $4, $5)',
    [
      user.first_name,
      user.last_name,
      user.username,
      user.email,
      user.password_digest
    ],
    error => {
      if (error) {
        throw error;
      }
      res.send('Account creation successful.');
    }
  );
});

module.exports = router;
