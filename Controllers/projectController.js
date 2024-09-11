const Project = require('../models/Project');

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el proyecto', error });
    }
};

// Obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proyectos', error });
    }
};

// Obtener un proyecto por ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proyecto', error });
    }
};

// Actualizar un proyecto por ID
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el proyecto', error });
    }
};

// Eliminar un proyecto por ID
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proyecto', error });
    }
};

const createProject = async (req, res) => {
    try {
        const { name, description, projectType, resources } = req.body;

        const newProject = new Project({
            name,
            description,
            projectType,
            resources
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProjectResources = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { resources } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.resources = resources;  // Actualiza los recursos
        await project.save();
        
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProjectType = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { projectType } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.projectType = projectType;
        await project.save();

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

