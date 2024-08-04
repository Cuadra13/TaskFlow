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

// Obtener todas las tareas de un proyecto
router.get('/:projectId', async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar una tarea
router.put('/:taskId', async (req, res) => {
    const { name, description, status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            { name, description, status },
            { new: true }
        );
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar una tarea
router.delete('/:taskId', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
