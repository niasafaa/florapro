require('dotenv').config();

const express = require('express');
const client = require('../../db');

const router = express.Router();
router.post('/getToken', (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(401).send('Fields incomplete');
  }
  User.forge({ email: req.body.email }).fetch().then(result => {
    if (!result) {
      return res.status(400).send('User not found.');
    }
    result.authenticate(req.body.password).then(user => {
      const payload = { id: user.id};
      const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '1h' }); 
      res.send(token); 
      }).catch(err => {
        return res.status(401).send({err});
      });
    });
  }):
module.exports = router;
