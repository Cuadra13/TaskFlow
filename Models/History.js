const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }
});

module.exports = mongoose.model('History', historySchema);
