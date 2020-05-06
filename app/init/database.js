// Initializes the database schema
const pool = require('../config/database').conn;

const queries = `
  CREATE DATABASE IF NOT EXISTS wbdemo;
  CREATE TABLE IF NOT EXISTS wbdemo.users (
    id VARCHAR(100) NOT NULL,
    temp VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );
`;

pool.query(queries, function(err) {
  if (err) {
    console.error(`Database init failed: ${err.stack}`);
    process.exit(1);
  }
  console.log('Database is ready.');
  process.exit();
});