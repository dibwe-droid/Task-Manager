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
      if ((error as Error).message === 'Project not found') {
        res.status(400).json({
          status: 'error',
          message: 'Project not found',
        });
        return;
      }
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
   * Get all tasks with filtering, sorting, and pagination
   */
  async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = {
        projectId: req.query.projectId as string | undefined,
        tag: req.query.tag as string | undefined,
        completed: req.query.completed as string | undefined,
        priority: req.query.priority as 'low' | 'medium' | 'high' | undefined,
        dueBefore: req.query.dueBefore as string | undefined,
        sort: req.query.sort as string | undefined,
        limit: req.query.limit as string | undefined,
        skip: req.query.skip as string | undefined,
      };

      const result = await taskService.getAllTasks(queryParams);

      res.status(200).json(result);
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
      if ((error as Error).message === 'Project not found') {
        res.status(400).json({
          status: 'error',
          message: 'Project not found',
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
