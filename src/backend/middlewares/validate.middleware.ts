import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

// Zod schema for creating a task
const createTaskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(1, 'Title cannot be empty')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').trim().optional(),
  dueDate: z.preprocess((val) => {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date().optional()),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  tags: z.array(z.string()).optional(),
  completed: z.boolean().optional(),
  subtasks: z
    .array(
      z.object({
        title: z.string().min(1, 'Subtask title cannot be empty').trim(),
      })
    )
    .optional(),
  projectId: z.string().optional(),
});

// Zod schema for updating a task
const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(200, 'Title cannot exceed 200 characters').trim().optional(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').trim().optional(),
  dueDate: z.preprocess((val) => {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    if (typeof val === 'string') return new Date(val);
    return val;
  }, z.date().optional()),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  tags: z.array(z.string()).optional(),
  completed: z.boolean().optional(),
  subtasks: z
    .array(
      z.object({
        id: z.string(),
        title: z.string().min(1, 'Subtask title cannot be empty').trim(),
        completed: z.boolean(),
      })
    )
    .optional(),
  projectId: z.string().optional(),
});

// Zod schema for creating a project
const createProjectSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, 'Name cannot be empty')
    .max(200, 'Name cannot exceed 200 characters')
    .trim(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').trim().optional(),
});

// Zod schema for updating a project
const updateProjectSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').max(200, 'Name cannot exceed 200 characters').trim().optional(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').trim().optional(),
});

/**
 * Validation middleware for creating a task
 */
export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      logger.warn('Validation failed for create task', { errors });

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {} as Record<string, string>),
      });
      return;
    }

    next(error);
  }
};

/**
 * Validation middleware for updating a task
 */
export const validateUpdateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validatedData = updateTaskSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      logger.warn('Validation failed for update task', { errors });

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {} as Record<string, string>),
      });
      return;
    }

    next(error);
  }
};

/**
 * Validation middleware for creating a project
 */
export const validateProject = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validatedData = createProjectSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      logger.warn('Validation failed for create project', { errors });

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {} as Record<string, string>),
      });
      return;
    }

    next(error);
  }
};

/**
 * Validation middleware for updating a project
 */
export const validateUpdateProject = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validatedData = updateProjectSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      logger.warn('Validation failed for update project', { errors });

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {} as Record<string, string>),
      });
      return;
    }

    next(error);
  }
};
