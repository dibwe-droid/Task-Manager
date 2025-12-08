import { Router } from 'express';
import { projectController } from '../controllers/project.controller';
import { validateProject, validateUpdateProject } from '../middlewares/validate.middleware';

const router = Router();

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post('/', validateProject, projectController.createProject.bind(projectController));

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', projectController.getAllProjects.bind(projectController));

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Public
 */
router.get('/:id', projectController.getProject.bind(projectController));

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Public
 */
router.put('/:id', validateUpdateProject, projectController.updateProject.bind(projectController));

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Public
 */
router.delete('/:id', projectController.deleteProject.bind(projectController));

export default router;
