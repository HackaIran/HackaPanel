'use strict';

const mysql = require('mysql');
const config = require('../config/index');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : config.db.host,
  port            : config.db.port,
  user            : config.db.user,
  password        : config.db.password,
  database: config.db.database
});

module.exports = {
  mysql: mysql,
  pool: pool
};
