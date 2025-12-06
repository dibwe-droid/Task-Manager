import { Request, Response, NextFunction } from 'express';
import { taskService, CreateTaskData, UpdateTaskData } from '../services/task.service';

export class TaskController {
  /**
   * Create a new task
   */
  async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskData: CreateTaskData = req.body;
      const task = await taskService.createTask(taskData);

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single task by ID
   */
  async getTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      res.status(200).json(task);
    } catch (error) {
      if ((error as Error).message === 'Task not found') {
        res.status(404).json({
          status: 'error',
          message: 'Task not found',
        });
        return;
      }
      next(error);
    }
  }

  /**
   * Get all tasks
   */
  async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a task
   */
  async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateTaskData = req.body;

      const task = await taskService.updateTask(id, updateData);

      res.status(200).json(task);
    } catch (error) {
      if ((error as Error).message === 'Task not found') {
        res.status(404).json({
          status: 'error',
          message: 'Task not found',
        });
        return;
      }
      next(error);
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id);

      res.status(204).send();
    } catch (error) {
      if ((error as Error).message === 'Task not found') {
        res.status(404).json({
          status: 'error',
          message: 'Task not found',
        });
        return;
      }
      next(error);
    }
  }
}

export const taskController = new TaskController();
