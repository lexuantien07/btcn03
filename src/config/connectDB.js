const Pool = require('pg-promise')();

const connection = require('../config/connectStr.js');

const pool = Pool(connection);

module.exports = pool;