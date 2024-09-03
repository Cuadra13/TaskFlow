const express = require('express');
const router = express.Router();
const Task = require('../TaskFlow/Models/Task');
const auth = require('../TaskFlow/Middleware/auth');

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

//Agregar comentarios a tareas
router.post('/:taskId/comments', auth, async (req, res) => {
    const { comment } = req.body;
    try {
        const task = await Task.findById(req.params.taskId);
        task.comments.push({ user: req.user._id, comment });
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Notificaciones por cambio de estado
router.put('/:taskId', auth, async (req, res) => {
    const { status } = req.body;
    try {
        const task = await Task.findById(req.params.taskId);
        task.status = status;
        await task.save();

        // Crear notificación
        const notification = new Notification({
            user: task.user,
            message: `La tarea '${task.name}' cambió su estado a '${status}'.`
        });
        await notification.save();

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Registro de cambios
router.put('/:taskId', auth, async (req, res) => {
    const { name, description, status } = req.body;
    try {
        const task = await Task.findById(req.params.taskId);
        const updates = [];

        if (name) {
            updates.push(`Nombre de '${task.name}' a '${name}'`);
            task.name = name;
        }
        if (description) {
            updates.push('Descripción actualizada');
            task.description = description;
        }
        if (status) {
            updates.push(`Estado de '${task.status}' a '${status}'`);
            task.status = status;
        }

        task.history.push({ user: req.user._id, action: updates.join(', ') });
        await task.save();

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



module.exports = router;
