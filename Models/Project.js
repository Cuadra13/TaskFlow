const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: { type: String, required: true },  // Estado del proyecto (e.g., 'Active', 'Completed')
    
    // Nuevo campo: Tipo de proyecto (e.g., 'Desarrollo', 'Marketing', etc.)
    projectType: { 
        type: String, 
        required: true, 
        enum: ['Desarrollo', 'Marketing', 'Investigación', 'Otro'] 
    },
    
    // Nuevo campo: Recursos invertidos en el proyecto (puede ser un array de objetos)
    resources: [{
        name: { type: String, required: true },  // Nombre del recurso (e.g., 'Dinero', 'Tiempo', 'Personal')
        amount: { type: Number, required: true },  // Cantidad invertida (e.g., número de horas, monto en dinero)
        unit: { type: String, required: true }  // Unidad (e.g., 'USD', 'horas', 'personas')
    }],

    // Relación con tareas
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Project', ProjectSchema);
