const express = require('express');
const router = express.Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');

// Generate OTP (for simplicity, using random 6-digit numbers)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Endpoint to handle registration
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, mobile } = req.body;
    const emailOtp = generateOtp();
    const mobileOtp = generateOtp();

    try {
        // Save user with OTPs to MongoDB
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            emailOtp,
            mobileOtp
        });
        await newUser.save();

        // Send OTP to email using nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Email OTP Verification',
            text: `Your OTP is: ${emailOtp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(200).send({ message: 'User registered successfully, OTP sent to email and mobile.' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});

module.exports = router;
