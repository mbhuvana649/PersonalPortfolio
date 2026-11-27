const db = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('My Personal Portfolio Backend is Working!');
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body || {};

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and message are required.'
            });
        }

        const cleanName = String(name).trim();
        const cleanEmail = String(email).trim();
        const cleanMessage = String(message).trim();

        if (!cleanName || !cleanEmail || !cleanMessage) {
            return res.status(400).json({
                success: false,
                message: 'All fields must contain valid text.'
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address.'
            });
        }

        const result = await db.query(
            'INSERT INTO contact_message (name, email, message) VALUES ($1, $2, $3)',
            [cleanName, cleanEmail, cleanMessage]
        );

        return res.status(201).json({
            success: true,
            message: 'Message received and saved!'
        });

    } catch (error) {
        console.error('Contact route error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to save your message.'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
