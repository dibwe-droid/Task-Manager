import { Task, ITask } from '../models/task.model';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

export interface CreateTaskData {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  subtasks?: Array<{ title: string }>;
  projectId?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  completed?: boolean;
  subtasks?: Array<{ id: string; title: string; completed: boolean }>;
  projectId?: string;
}

export class TaskService {
  /**
   * Create a new task
   */
  async createTask(data: CreateTaskData): Promise<ITask> {
    try {
      // Convert subtasks with just title to full subtask objects
      const subtasks = data.subtasks?.map((subtask, index) => ({
        id: `s${Date.now()}-${index}`,
        title: subtask.title,
        completed: false,
      }));

      const taskData = {
        ...data,
        subtasks: subtasks || [],
      };

      const task = new Task(taskData);
      const savedTask = await task.save();

      logger.info('Task created', { taskId: savedTask._id.toString() });
      return savedTask;
    } catch (error) {
      logger.error('Failed to create task', error as Error);
      throw error;
    }
  }

  /**
   * Get a task by ID
   */
  async getTaskById(id: string): Promise<ITask> {
    try {
      const task = await Task.findById(id);

      if (!task) {
        throw new Error('Task not found');
      }

      return task;
    } catch (error) {
      // Let CastErrors propagate to error middleware
      if (error instanceof mongoose.Error.CastError) {
        throw error;
      }
      if ((error as Error).message === 'Task not found') {
        throw error;
      }
      logger.error('Failed to get task by ID', error as Error, { taskId: id });
      throw error;
    }
  }

  /**
   * Get all tasks (basic implementation, no filters yet)
   */
  async getAllTasks(): Promise<ITask[]> {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return tasks;
    } catch (error) {
      logger.error('Failed to get all tasks', error as Error);
      throw error;
    }
  }

  /**
   * Update a task
   */
  async updateTask(id: string, data: UpdateTaskData): Promise<ITask> {
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!task) {
        throw new Error('Task not found');
      }

      logger.info('Task updated', { taskId: id });
      return task;
    } catch (error) {
      // Let CastErrors propagate to error middleware
      if (error instanceof mongoose.Error.CastError) {
        throw error;
      }
      if ((error as Error).message === 'Task not found') {
        throw error;
      }
      logger.error('Failed to update task', error as Error, { taskId: id });
      throw error;
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<void> {
    try {
      const task = await Task.findByIdAndDelete(id);

      if (!task) {
        throw new Error('Task not found');
      }

      logger.info('Task deleted', { taskId: id });
    } catch (error) {
      // Let CastErrors propagate to error middleware
      if (error instanceof mongoose.Error.CastError) {
        throw error;
      }
      if ((error as Error).message === 'Task not found') {
        throw error;
      }
      logger.error('Failed to delete task', error as Error, { taskId: id });
      throw error;
    }
  }
}

export const taskService = new TaskService();
