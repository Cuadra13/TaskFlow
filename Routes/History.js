const express = require('express');
const router = express.Router();
const History = require('../TaskFlow/Models/History');
const auth = require('../TaskFlow/Middleware/auth');

// Registrar un cambio de estado en la historia
router.post('/:taskId', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const newHistory = new History({
            task: req.params.taskId,
            status,
            user: req.user.id
        });
        await newHistory.save();

        res.status(201).json(newHistory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
