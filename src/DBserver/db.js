const { Pool } = require('pg');
const { HOST, USER, NAME, PASSWORD, PORT } = require('./DB/consts');



module.exports = new Pool({
    host: HOST,
    user: USER,
    database: NAME,
    password: PASSWORD,
    port: PORT
});