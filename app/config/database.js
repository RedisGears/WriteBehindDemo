// Database connection pool
const mysql = require('mysql');

const env = process.env.NODE_ENV || 'development';
const opt = {
  host: env === 'development'
    ? 'localhost'
    : 'db',
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
};

const conn = mysql.createConnection({
  ...opt,
  multipleStatements: true
});

const pool = mysql.createPool({
  ...opt,
  database: 'wbdemo',
  connectionLimit: 10,
});

module.exports = { pool, conn }