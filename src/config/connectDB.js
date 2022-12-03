const Pool = require('pg-promise')();

const connection = {
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: '1234',
    database: 'datajson'
}

const pool = Pool(connection);


module.exports = pool;