const Config = require('pg').Pool;
require('dotenv').config();
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
const db = new Config({
  host: 'localhost',
  user: DATABASE_USER,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: 5432,
});
db.connect(function (err) {
  if (err) {
    console.log('Error connected to database');
    return;
  }
});
module.exports = {
  db,
};