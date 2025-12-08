import { FilterQuery } from 'mongoose';
import { ITask } from '../models/task.model';

export interface TaskFilters {
  projectId?: string;
  tag?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueBefore?: Date;
}

export interface TaskQueryParams {
  projectId?: string;
  tag?: string;
  completed?: string;
  priority?: 'low' | 'medium' | 'high';
  dueBefore?: string;
  sort?: string;
  limit?: string;
  skip?: string;
}

export interface SortOptions {
  field: string;
  direction: 1 | -1;
}

/**
 * Build MongoDB filter object from query parameters
 */
export function buildTaskFilters(params: TaskQueryParams): FilterQuery<ITask> {
  const filter: FilterQuery<ITask> = {};

  // Filter by projectId
  if (params.projectId) {
    filter.projectId = params.projectId;
  }

  // Filter by tag (array contains)
  if (params.tag) {
    filter.tags = { $in: [params.tag] };
  }

  // Filter by completed status
  if (params.completed !== undefined) {
    filter.completed = params.completed === 'true' || params.completed === true;
  }

  // Filter by priority
  if (params.priority && ['low', 'medium', 'high'].includes(params.priority)) {
    filter.priority = params.priority;
  }

  // Filter by dueBefore (tasks due before a specific date)
  if (params.dueBefore) {
    const dueDate = new Date(params.dueBefore);
    if (!isNaN(dueDate.getTime())) {
      filter.dueDate = { $lt: dueDate };
    }
  }

  return filter;
}

/**
 * Parse sort string and return sort options
 * Supports: "dueDate", "-dueDate", "priority", "-priority", "createdAt", "-createdAt"
 */
export function parseSort(sortString?: string): SortOptions | null {
  if (!sortString) {
    return null;
  }

  const isDescending = sortString.startsWith('-');
  const field = isDescending ? sortString.slice(1) : sortString;

  // Valid sort fields
  const validFields = ['dueDate', 'priority', 'createdAt'];
  if (!validFields.includes(field)) {
    return null;
  }

  return {
    field,
    direction: isDescending ? -1 : 1,
  };
}

/**
 * Parse pagination parameters
 */
export function parsePagination(limit?: string, skip?: string): { limit: number; skip: number } {
  const defaultLimit = 20;
  const defaultSkip = 0;

  const parsedLimit = limit ? parseInt(limit, 10) : defaultLimit;
  const parsedSkip = skip ? parseInt(skip, 10) : defaultSkip;

  // Validate and constrain values
  const finalLimit = isNaN(parsedLimit) || parsedLimit < 1 ? defaultLimit : Math.min(parsedLimit, 100); // Max 100
  const finalSkip = isNaN(parsedSkip) || parsedSkip < 0 ? defaultSkip : parsedSkip;

  return {
    limit: finalLimit,
    skip: finalSkip,
  };
}
