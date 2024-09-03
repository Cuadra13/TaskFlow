const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Referencia a Comments
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }] // Referencia a History
});

module.exports = mongoose.model('Task', TaskSchema);


