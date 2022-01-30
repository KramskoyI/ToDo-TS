const express = require("express");
const cors = require('cors');
const PORT = 3000
const router = require('./routes-server/routers');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/v1/', router);


app.listen(PORT, () => {
    console.log(`Сервер на порту ${PORT}`)
});