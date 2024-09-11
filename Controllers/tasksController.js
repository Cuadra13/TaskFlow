const Task = require('../Models/Task');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
};

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('project').populate('user');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('project').populate('user');
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea', error });
    }
};

// Actualizar una tarea por ID
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
};

// Eliminar una tarea por ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
};

exports.startTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.startDate = new Date();  // Asignar la fecha de inicio
        task.status = 'In Progress';
        task.statusStartDate = new Date();  // Fecha de inicio del estado actual
        task.history.push({ action: 'Task Started', date: new Date(), user: req.user._id });

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.assignTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { userId } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.user = userId;
        task.assignedDate = new Date();  // Registrar la fecha de asignación
        task.history.push({ action: 'Task Assigned', date: new Date(), user: req.user._id });

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Registrar la fecha de finalización del estado anterior
        task.statusEndDate = new Date();
        
        // Actualizar el estado
        task.status = status;
        task.statusStartDate = new Date();  // Registrar el inicio del nuevo estado

        if (status === 'Done') {
            task.completionDate = new Date();  // Registrar la fecha de finalización real
        }

        task.history.push({ action: `Status changed to ${status}`, date: new Date(), user: req.user._id });

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
