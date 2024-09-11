const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const HistorySchema = new mongoose.Schema({
    action: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Usuario que realizó la acción
});

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },  // Status de la tarea (e.g., 'To Do', 'In Progress', 'Done')
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Usuario asignado
    comments: [CommentSchema],
    history: [HistorySchema],
    startDate: { type: Date },  // Fecha de inicio de la tarea
    statusStartDate: { type: Date },  // Fecha de inicio del estado actual
    statusEndDate: { type: Date },  // Fecha de finalización del estado actual
    assignedDate: { type: Date },  // Fecha en que la tarea fue asignada a un usuario
    completionDate: { type: Date }  // Fecha real de finalización
});

module.exports = mongoose.model('Task', TaskSchema);


