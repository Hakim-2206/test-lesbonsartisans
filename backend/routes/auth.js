const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post('/register',
    body('username').isLength({min: 3}),
    body('password').isLength({min: 6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

        const {username, password} = req.body;
        const existingUser = await User.findOne({username});
        if (existingUser) return res.status(400).json({message: 'User already exist'});

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({username, passwordHash});
        await user.save();

        res.status(201).json({message: 'User created.'});
    }
);

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({message: 'Invalid credentials'});

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token, username: user.username});
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({message: 'Erreur serveur lors du login'});
    }
});


module.exports = router;