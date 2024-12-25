const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const { error } = require('jquery');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/khoahoc', (req, res) => {
    const sql = 'SELECT * FROM khoahoc';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});