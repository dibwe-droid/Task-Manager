/**
 * Logger Usage Examples
 *
 * This file demonstrates how to use the logger utility throughout the application.
 */

import { logger } from './logger';

// Example 1: Basic error logging
export function exampleBasicError() {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    logger.error('Operation failed', error as Error);
  }
}

// Example 2: Error with context
export function exampleErrorWithContext() {
  try {
    throw new Error('Task not found');
  } catch (error) {
    logger.error('Failed to retrieve task', error as Error, {
      taskId: '507f1f77bcf86cd799439011',
      userId: 'user123',
    });
  }
}

// Example 3: Warning
export function exampleWarning() {
  logger.warn('Rate limit approaching', {
    userId: 'user123',
    requestsRemaining: 5,
  });
}

// Example 4: Info logging
export function exampleInfo() {
  logger.info('Task created successfully', {
    taskId: '507f1f77bcf86cd799439011',
    title: 'Complete project',
  });
}

// Example 5: Debug logging (only in development)
export function exampleDebug() {
  logger.debug('Query executed', {
    query: 'db.tasks.find({ completed: false })',
    executionTime: '45ms',
  });
}

// Example 6: In error middleware (Sprint 2)
export function exampleErrorMiddleware(req: any, error: Error) {
  logger.error('Request error', error, {
    method: req.method,
    path: req.path,
    statusCode: 500,
    body: req.body,
    query: req.query,
    ip: req.ip,
  });
}

// Example 7: In service layer
export function exampleServiceError(taskId: string) {
  const error = new Error('Task not found');
  logger.error('Task retrieval failed', error, {
    taskId,
    operation: 'getTaskById',
  });
  throw error;
}

