// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../Models/Project');

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
    const { name, description, user } = req.body;

    try {
        const project = new Project({ name, description, user });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
