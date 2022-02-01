const { Client } = require('pg');
const { HOST, USER, PASSWORD, PORT, NAME } = require('./consts');

const client = new Client({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: NAME,
    port: PORT
});


const table = `
    CREATE TABLE  "todo" (
        "id" SERIAL,
        "text" VARCHAR(120) NOT NULL,
        "checked" BOOLEAN NOT NULL,
        PRIMARY KEY ("id")
    );
`

const createDB = async (query) => {
    try {
        await client.connect();
        await client.query(query);
    } catch (error) {
        console.log(error);
        return false
    } finally {
        await client.end();
    }
}

createDB(table).then((result) => {
    console.log('Table');
})