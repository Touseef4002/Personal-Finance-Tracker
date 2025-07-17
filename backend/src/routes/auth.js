const User = require('../models/user.model');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try{
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10) // Hash the password
        });

        const savedUser = await user.save();

        const token = jwt.sign({
            userId : savedUser._id,
            username: savedUser.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        })
    }

    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

module.exports = router;