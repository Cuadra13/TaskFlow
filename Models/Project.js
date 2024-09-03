const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    type: String, // Tipo de proyecto
    resources: { type: Number, default: 0 }, // Recursos invertidos
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Project', ProjectSchema);
