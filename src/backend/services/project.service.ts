import { Project, IProject } from '../models/project.model';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

export interface CreateProjectData {
  name: string;
  description?: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
}

export class ProjectService {
  /**
   * Create a new project
   */
  async createProject(data: CreateProjectData): Promise<IProject> {
    try {
      const project = new Project(data);
      const savedProject = await project.save();

      logger.info('Project created', { projectId: savedProject._id.toString() });
      return savedProject;
    } catch (error) {
      logger.error('Failed to create project', error as Error);
      throw error;
    }
  }

  /**
   * Get a project by ID
   */
  async getProjectById(id: string): Promise<IProject> {
    try {
      const project = await Project.findById(id);

      if (!project) {
        throw new Error('Project not found');
      }

      return project;
    } catch (error) {
      // Let CastErrors propagate to error middleware
      if (error instanceof mongoose.Error.CastError) {
        throw error;
      }
      if ((error as Error).message === 'Project not found') {
        throw error;
      }
      logger.error('Failed to get project by ID', error as Error, { projectId: id });
      throw error;
    }
  }

  /**
   * Get all projects
   */
  async getAllProjects(): Promise<IProject[]> {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      return projects;
    } catch (error) {
      logger.error('Failed to get all projects', error as Error);
      throw error;
    }
  }

  /**
   * Update a project
   */
  async updateProject(id: string, data: UpdateProjectData): Promise<IProject> {
    try {
      const project = await Project.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!project) {
        throw new Error('Project not found');
      }

      logger.info('Project updated', { projectId: id });
      return project;
    } catch (error) {
      // Let CastErrors propagate to error middleware
      if (error instanceof mongoose.Error.CastError) {
        throw error;
      }
      if ((error as Error).message === 'Project not found') {
        throw error;
      }
      logger.error('Failed to update project', error as Error, { projectId: id });
      throw error;
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    try {
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        throw new Error('Project not found');
      }

      logger.info('Project deleted', { projectId: id });
    } catch (error) {
      // Let CastErrors propagate to error middleware
      if (error instanceof mongoose.Error.CastError) {
        throw error;
      }
      if ((error as Error).message === 'Project not found') {
        throw error;
      }
      logger.error('Failed to delete project', error as Error, { projectId: id });
      throw error;
    }
  }
}

export const projectService = new ProjectService();
