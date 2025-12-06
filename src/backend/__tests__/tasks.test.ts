import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { Task } from '../models/task.model';

describe('Tasks API', () => {
  describe('POST /api/tasks', () => {
    it('should create a task with valid data', async () => {
      const taskData = {
        title: 'Test task',
        description: 'This is a test task',
        priority: 'high',
        tags: ['test', 'sprint-2'],
      };

      const res = await request(app).post('/api/tasks').send(taskData).expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe(taskData.title);
      expect(res.body.description).toBe(taskData.description);
      expect(res.body.priority).toBe(taskData.priority);
      expect(res.body.tags).toEqual(taskData.tags);
      expect(res.body.completed).toBe(false);
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('updatedAt');
    });

    it('should create a task with subtasks', async () => {
      const taskData = {
        title: 'Task with subtasks',
        subtasks: [
          { title: 'Subtask 1' },
          { title: 'Subtask 2' },
        ],
      };

      const res = await request(app).post('/api/tasks').send(taskData).expect(201);

      expect(res.body.subtasks).toHaveLength(2);
      expect(res.body.subtasks[0]).toHaveProperty('id');
      expect(res.body.subtasks[0].title).toBe('Subtask 1');
      expect(res.body.subtasks[0].completed).toBe(false);
    });

    it('should return 400 for missing title', async () => {
      const taskData = {
        description: 'Task without title',
      };

      const res = await request(app).post('/api/tasks').send(taskData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
      expect(res.body.details).toHaveProperty('title');
    });

    it('should return 400 for empty title', async () => {
      const taskData = {
        title: '',
      };

      const res = await request(app).post('/api/tasks').send(taskData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });

    it('should return 400 for invalid priority', async () => {
      const taskData = {
        title: 'Test task',
        priority: 'invalid',
      };

      const res = await request(app).post('/api/tasks').send(taskData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });

    it('should return 400 for title exceeding max length', async () => {
      const taskData = {
        title: 'a'.repeat(201),
      };

      const res = await request(app).post('/api/tasks').send(taskData).expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should get a task by ID', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to retrieve' })
        .expect(201);

      const taskId = createRes.body._id;

      // Retrieve the task
      const res = await request(app).get(`/api/tasks/${taskId}`).expect(200);

      expect(res.body._id).toBe(taskId);
      expect(res.body.title).toBe('Task to retrieve');
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const res = await request(app).get(`/api/tasks/${fakeId}`).expect(404);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Task not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/tasks/invalid-id').expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Invalid ID format');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return an array of tasks', async () => {
      // Create a few tasks
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });
      await request(app).post('/api/tasks').send({ title: 'Task 3' });

      const res = await request(app).get('/api/tasks').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it('should return empty array when no tasks exist', async () => {
      // Clean up all tasks
      await Task.deleteMany({});

      const res = await request(app).get('/api/tasks').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Original title', priority: 'low' })
        .expect(201);

      const taskId = createRes.body._id;

      // Update the task
      const updateData = {
        title: 'Updated title',
        priority: 'high',
        completed: true,
      };

      const res = await request(app).put(`/api/tasks/${taskId}`).send(updateData).expect(200);

      expect(res.body.title).toBe(updateData.title);
      expect(res.body.priority).toBe(updateData.priority);
      expect(res.body.completed).toBe(updateData.completed);
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const res = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send({ title: 'Updated title' })
        .expect(404);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Task not found');
    });

    it('should return 400 for invalid update data', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test task' })
        .expect(201);

      const taskId = createRes.body._id;

      // Try to update with invalid priority
      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ priority: 'invalid' })
        .expect(400);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Validation failed');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to delete' })
        .expect(201);

      const taskId = createRes.body._id;

      // Delete the task
      await request(app).delete(`/api/tasks/${taskId}`).expect(204);

      // Verify it's deleted
      await request(app).get(`/api/tasks/${taskId}`).expect(404);
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const res = await request(app).delete(`/api/tasks/${fakeId}`).expect(404);

      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Task not found');
    });
  });
});
