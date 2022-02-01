const { Client } = require('pg');
const { HOST, USER, PASSWORD, PORT } = require('./consts');

const client = new Client({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: PORT
});

const createDB = async () => {
  try {
    await client.connect();
    await client.query('CREATE DATABASE todos');
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.end();
  }
};

createDB().then((result) => {
  console.log('DB has been created');
});
