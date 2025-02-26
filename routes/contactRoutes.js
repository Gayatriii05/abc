const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 
const { body, validationResult } = require('express-validator');

router.post(
    '/',
    [
        body('name').trim().escape().notEmpty().withMessage('Name is required'),
        body('email').trim().normalizeEmail().isEmail().withMessage('Enter a valid email address'),
        body('phone').optional().trim().matches(/^\d{10,15}$/).withMessage('Enter a valid phone number (10-15 digits)'),
        body('message').trim().escape().notEmpty().withMessage('Message cannot be empty').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, message } = req.body;

        try {
            await pool.execute(
                'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
                [name, email, phone || null, message]
            );

            res.status(201).json({ message: 'Contact request submitted successfully.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

module.exports = router;
