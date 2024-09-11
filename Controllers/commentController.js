const Task = require('../models/Task');

// Agregar un comentario a una tarea
exports.addComment = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        task.comments.push(req.body);
        await task.save();
        res.status(201).json(task.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el comentario', error });
    }
};

// Obtener todos los comentarios de una tarea
exports.getComments = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('comments.user');
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios', error });
    }
};

// Eliminar un comentario de una tarea
exports.deleteComment = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        task.comments.id(req.params.commentId).remove();
        await task.save();
        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario', error });
    }
};
