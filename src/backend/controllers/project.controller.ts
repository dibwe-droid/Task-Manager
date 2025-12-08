import { Request, Response, NextFunction } from 'express';
import { projectService, CreateProjectData, UpdateProjectData } from '../services/project.service';

export class ProjectController {
  /**
   * Create a new project
   */
  async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projectData: CreateProjectData = req.body;
      const project = await projectService.createProject(projectData);

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single project by ID
   */
  async getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);

      res.status(200).json(project);
    } catch (error) {
      if ((error as Error).message === 'Project not found') {
        res.status(404).json({
          status: 'error',
          message: 'Project not found',
        });
        return;
      }
      next(error);
    }
  }

  /**
   * Get all projects
   */
  async getAllProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await projectService.getAllProjects();

      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a project
   */
  async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateProjectData = req.body;

      const project = await projectService.updateProject(id, updateData);

      res.status(200).json(project);
    } catch (error) {
      if ((error as Error).message === 'Project not found') {
        res.status(404).json({
          status: 'error',
          message: 'Project not found',
        });
        return;
      }
      next(error);
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);

      res.status(204).send();
    } catch (error) {
      if ((error as Error).message === 'Project not found') {
        res.status(404).json({
          status: 'error',
          message: 'Project not found',
        });
        return;
      }
      next(error);
    }
  }
}

export const projectController = new ProjectController();
