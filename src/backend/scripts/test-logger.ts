/**
 * Test script for the logger utility
 * Run with: ts-node scripts/test-logger.ts
 */

import { logger } from '../utils/logger';

logger.info('Testing Logger Utility');
logger.info('='.repeat(50));

// Test error logging
logger.info('1. Error Log (with error object):');
logger.error('Database connection failed', new Error('Connection timeout'), {
  host: 'localhost',
  port: 27017,
});

// Test error without error object
logger.info('2. Error Log (message only):');
logger.error('Invalid request received');

// Test warning
logger.info('3. Warning Log:');
logger.warn('Rate limit approaching', {
  userId: 'user123',
  requestsRemaining: 5,
});

// Test info
logger.info('4. Info Log:');
logger.info('Task created successfully', {
  taskId: '507f1f77bcf86cd799439011',
  title: 'Complete project documentation',
});

// Test debug (only shows in development)
logger.info('5. Debug Log (only in development):');
logger.debug('Query executed', {
  query: 'db.tasks.find({ completed: false })',
  executionTime: '45ms',
  resultCount: 10,
});

// Test with complex context
logger.info('6. Error with complex context:');
logger.error('Request processing failed', new Error('Validation error'), {
  method: 'POST',
  path: '/api/tasks',
  body: { title: 'New Task', description: 'Task description' },
  query: { filter: 'active' },
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
});

logger.info('='.repeat(50));
logger.info('Logger test completed!');

