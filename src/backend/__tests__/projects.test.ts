import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { Project } from '../models/project.model';

describe('Projects API', () => {
  describe('POST /api/projects', () => {
    it('should create a project with valid data', async () => {
      const projectData = {
        name: 'Test Project',
        description: 'This is a test project',
      };

      const res = await request(app).post('/api/projects').send(projectData).expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe(projectData.name);
      expect(res.body.description).toBe(projectData.description);
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('updatedAt');
    });

    it('should create a project without description', async () => {
      const projectData = {
        name: 'Project without description',
      };

      const res = await request(app).post('/api/projects').send(projectData).expect(201);

      expect(res.body.name).toBe(projectData.name);
      expect(res.body.description).toBeUndefined();
    });

    it('should return 400 for missing name', async () => {
      const projectData = {
        description: 'Project without name',
      };

      const res = await request(app).post('/api/projects').send(projectData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
      expect(res.body.details).toHaveProperty('name');
    });

    it('should return 400 for empty name', async () => {
      const projectData = {
        name: '',
      };

      const res = await request(app).post('/api/projects').send(projectData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });

    it('should return 400 for name exceeding max length', async () => {
      const projectData = {
        name: 'a'.repeat(201),
      };

      const res = await request(app).post('/api/projects').send(projectData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should get a project by ID', async () => {
      // Create a project first
      const createRes = await request(app)
        .post('/api/projects')
        .send({ name: 'Project to retrieve' })
        .expect(201);

      const projectId = createRes.body._id;

      // Retrieve the project
      const res = await request(app).get(`/api/projects/${projectId}`).expect(200);

      expect(res.body._id).toBe(projectId);
      expect(res.body.name).toBe('Project to retrieve');
    });

    it('should return 404 for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const res = await request(app).get(`/api/projects/${fakeId}`).expect(404);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Project not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/projects/invalid-id').expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Invalid ID format');
    });
  });

  describe('GET /api/projects', () => {
    it('should return an array of projects', async () => {
      // Create a few projects
      await request(app).post('/api/projects').send({ name: 'Project 1' });
      await request(app).post('/api/projects').send({ name: 'Project 2' });
      await request(app).post('/api/projects').send({ name: 'Project 3' });

      const res = await request(app).get('/api/projects').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it('should return empty array when no projects exist', async () => {
      // Clean up all projects
      await Project.deleteMany({});

      const res = await request(app).get('/api/projects').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update a project', async () => {
      // Create a project first
      const createRes = await request(app)
        .post('/api/projects')
        .send({ name: 'Original name', description: 'Original description' })
        .expect(201);

      const projectId = createRes.body._id;

      // Update the project
      const updateData = {
        name: 'Updated name',
        description: 'Updated description',
      };

      const res = await request(app).put(`/api/projects/${projectId}`).send(updateData).expect(200);

      expect(res.body.name).toBe(updateData.name);
      expect(res.body.description).toBe(updateData.description);
    });

    it('should allow partial updates', async () => {
      // Create a project first
      const createRes = await request(app)
        .post('/api/projects')
        .send({ name: 'Original name', description: 'Original description' })
        .expect(201);

      const projectId = createRes.body._id;

      // Update only the name
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .send({ name: 'Updated name only' })
        .expect(200);

      expect(res.body.name).toBe('Updated name only');
      // Description should remain unchanged
      expect(res.body.description).toBe('Original description');
    });

    it('should return 404 for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const res = await request(app)
        .put(`/api/projects/${fakeId}`)
        .send({ name: 'Updated name' })
        .expect(404);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Project not found');
    });

    it('should return 400 for invalid update data', async () => {
      // Create a project first
      const createRes = await request(app)
        .post('/api/projects')
        .send({ name: 'Test project' })
        .expect(201);

      const projectId = createRes.body._id;

      // Try to update with empty name
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .send({ name: '' })
        .expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project', async () => {
      // Create a project first
      const createRes = await request(app)
        .post('/api/projects')
        .send({ name: 'Project to delete' })
        .expect(201);

      const projectId = createRes.body._id;

      // Delete the project
      await request(app).delete(`/api/projects/${projectId}`).expect(204);

      // Verify it's deleted
      await request(app).get(`/api/projects/${projectId}`).expect(404);
    });

    it('should return 404 for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const res = await request(app).delete(`/api/projects/${fakeId}`).expect(404);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Project not found');
    });
  });
});
