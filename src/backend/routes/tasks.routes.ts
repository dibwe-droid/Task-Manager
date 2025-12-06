import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { validateTask, validateUpdateTask } from '../middlewares/validate.middleware';

const router = Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Public
 */
router.post('/', validateTask, taskController.createTask.bind(taskController));

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks
 * @access  Public
 */
router.get('/', taskController.getAllTasks.bind(taskController));

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task by ID
 * @access  Public
 */
router.get('/:id', taskController.getTask.bind(taskController));

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Public
 */
router.put('/:id', validateUpdateTask, taskController.updateTask.bind(taskController));

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Public
 */
router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;
