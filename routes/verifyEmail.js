const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const verificationCodes = new Map();

router.post('/', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    verificationCodes.set(email, verificationCode);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Email Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Verification code sent successfully' });
});

module.exports = router;
