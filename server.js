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
    try {
        const { name, email, message } = req.body || {};

        // Check required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and message are required.'
            });
        }

        // Clean input
        const cleanName = String(name).trim();
        const cleanEmail = String(email).trim();
        const cleanMessage = String(message).trim();

        // Check empty values
        if (!cleanName || !cleanEmail || !cleanMessage) {
            return res.status(400).json({
                success: false,
                message: 'All fields must contain valid text.'
            });
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address.'
            });
        }

        console.log('CONTACT ROUTE REACHED');

        db.query(
            "INSERT INTO contact_message(name,email,message) VALUES(?, ?, ?)",
            [cleanName, cleanEmail, cleanMessage],
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);

                    return res.status(500).json({
                        success: false,
                        message: 'Unable to save your message right now.'
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: 'Message received and saved!'
                });
            }
        );

    } catch (error) {
        console.error('Contact route error:', error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        });
    }
});
app.listen(3000,()=>{
    console.log('Server running on port 3000');
});
