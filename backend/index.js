const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const d = require('./Database/db');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT|| 3000;

app.get('/api', (req, res) => {
    d.module.query(`INSERT INTO users VALUES (DEFAULT) RETURNING integer`).then(x => {
        res.json(x)
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

exports.modules = app