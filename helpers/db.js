const config = require('./config');
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || config.dbUrl);

module.exports = db;
