// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { name, description, status, project, user } = req.body;

    try {
        const task = new Task({ name, description, status, project, user });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
