require('dotenv').config();
// require packages
const { Client } = require('pg');

// Set up connection to database locally

// create PostgreSQL connection
if (!process.env.NODE_ENV) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
  module.exports = client;
}

if (process.env.NODE_ENV === 'production') {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  module.exports = client;
}
