require('dotenv').config();

const express = require('express');
const client = require('../db');

const router = express.Router();

// Get all Individuals in alphabetical order
router.get('/individuals', (req, res) => {
  client.query('SELECT * from individuals ORDER BY nickname', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results.rows);
  });
});

// Get all Individuals in alphabetical order
router.get('/individuals/:id', (req, res) => {
  client.query(
    'SELECT * from individuals WHERE individuals.id=$1',
    [req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results.rows);
    }
  );
});
// Get all sightings and Individuals
router.get('/sightings', (req, res) => {
  client.query(
    'SELECT individuals.nickname, sightings.date_time, sightings.country, sightings.health FROM sightings INNER JOIN individuals ON sightings.individual_id = individuals.id',
    (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results.rows);
    }
  );
});

// Create New Sighting
router.post('/addsighting', (req, res) => {
  const sightings = {
    date_time: req.body.date_time,
    individual_id: req.body.individual_id,
    country: req.body.country,
    health: req.body.health
  };

  client.query(
    'INSERT INTO sightings (date_time, individual_id, country, health) VALUES ($1, $2, $3, $4)',
    [sightings.date_time, sightings.individual_id, sightings.country, sightings.health],
    error => {
      if (error) {
        throw error;
      }
      res.send('You added a sighting to the databese.');
    }
  );
});

// Get all sightings between given dates
router.post('/searchsightings', (req, res) => {
  const dateRange = {
    start: req.body.start,
    end: req.body.end
  };
  client.query(
    'SELECT individuals.nickname, sightings.date_time, sightings.country, sightings.health FROM sightings INNER JOIN individuals ON sightings.individual_id = individuals.id WHERE sightings.date_time  >= $1 AND sightings.date_time < $2',
    [dateRange.start, dateRange.end],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results.rows);
    }
  );
});
module.exports = router;
