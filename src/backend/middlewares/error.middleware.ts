import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

/**
 * Centralized error handler
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logger.error('Request error', err, {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
  });

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      details: errors,
    });
    return;
  }

  // Handle Mongoose cast errors (invalid ObjectId, etc.)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid ID format',
    });
    return;
  }

  // Handle duplicate key errors
  if ((err as any).code === 11000) {
    res.status(400).json({
      status: 'error',
      message: 'Duplicate entry',
    });
    return;
  }

  // Default error response
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
};
