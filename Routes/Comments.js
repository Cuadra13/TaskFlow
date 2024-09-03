const express = require('express');
const router = express.Router();
const Comment = require('../TaskFlow/Models/Comment');
const auth = require('../TaskFlow/Middleware/auth');

// Agregar un comentario a una tarea
router.post('/:taskId', auth, async (req, res) => {
    try {
        const { comment } = req.body;
        const newComment = new Comment({
            user: req.user.id,
            task: req.params.taskId,
            comment
        });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
