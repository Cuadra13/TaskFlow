const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Task', TaskSchema);
