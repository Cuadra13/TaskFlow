// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
