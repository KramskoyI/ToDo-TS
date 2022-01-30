const { Client } = require('pg');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = require('./consts');


const client = new Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});


const createDB = async () => {
    try {
        await client.connect();
        await client.query('CREATE DATABASE todos');
    } catch (error) {
        console.log(error);
        return false
    } finally {
        await client.end();
    }
}


createDB().then((result) => {
    console.log('DB has been created');
})