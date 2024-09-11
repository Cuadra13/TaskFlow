const express = require('express');
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    startTask,
    assignTask,
    updateTaskStatus
} = require('../Controllers/tasksController');
const auth = require('../middleware/auth'); 

// Define tus rutas aquí
router.post('/', auth, createTask);
router.get('/', auth, getAllTasks);
router.get('/:id', auth, getTaskById);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.post('/:id/start', auth, startTask);
router.post('/:id/assign', auth, assignTask);
router.put('/:id/status', auth, updateTaskStatus);

module.exports = router;
