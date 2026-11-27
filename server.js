const db = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('My Personal Portfolio Backend is Working!');
});

app.post('/contact', (req, res) => {
    console.log('CONTACT ROUTE REACHED');

    const { name, email, message } = req.body;

    db.query(
        "INSERT INTO contact_message(name,email,message) VALUES(?, ?, ?)",
        [name, email, message],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Database error');
            }

            res.send('Message received and saved!');
        }
    );
});

module.exports = app;
