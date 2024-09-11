const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');
const auth = require('../middleware/auth');

router.post('/', auth, projectController.createProject);
router.get('/', auth, projectController.getAllProjects);
router.get('/:id', auth, projectController.getProjectById);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);
router.post('/', auth, createProject);
router.put('/:id/resources', auth, updateProjectResources);
router.put('/:id/type', auth, updateProjectType);

module.exports = router;
