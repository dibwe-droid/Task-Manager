# Sprint 2: Backend Core - Task CRUD

**Duration:** Week 2  
**Goal:** Build the core Task API with full CRUD operations

> **Testing Note:** Testing is part of this sprint! Write tests for all endpoints as you build them (see Task 8).

## Tasks

1. **Database Model**
   - Create `models/task.model.ts` with Mongoose schema
   - Define fields: `title` (required), `description`, `dueDate`, `priority`, `tags`, `completed`, `subtasks`, `projectId`, `createdAt`, `updatedAt`
   - Add schema validation (required fields, enum for priority)
   - Export Task model

2. **Service Layer**
   - Create `services/task.service.ts`
   - Implement `createTask()` method
   - Implement `getTaskById()` method
   - Implement `getAllTasks()` method (basic, no filters yet)
   - Implement `updateTask()` method
   - Implement `deleteTask()` method
   - Add error handling for not found cases

3. **Controller Layer**
   - Create `controllers/task.controller.ts`
   - Implement `createTask` controller
   - Implement `getTask` controller
   - Implement `getAllTasks` controller
   - Implement `updateTask` controller
   - Implement `deleteTask` controller
   - Return appropriate HTTP status codes

4. **Routes**
   - Create `routes/tasks.routes.ts`
   - Define `POST /api/tasks` route
   - Define `GET /api/tasks` route
   - Define `GET /api/tasks/:id` route
   - Define `PUT /api/tasks/:id` route
   - Define `DELETE /api/tasks/:id` route
   - Connect routes to controllers

5. **Validation Middleware**
   - Create `middlewares/validate.middleware.ts`
   - Set up Zod schema for task validation
   - Create validation middleware function
   - Apply to POST and PUT routes

6. **Error Handling**
   - Create `middlewares/error.middleware.ts`
   - Implement centralized error handler
   - Handle Mongoose validation errors
   - Handle 404 errors
   - Return consistent error response format
   - Add error logging

7. **App Configuration**
   - Update `app.ts` to include:
     - Express JSON middleware
     - CORS configuration
     - Routes mounting
     - Error middleware (last)
   - Update `server.ts` to connect to MongoDB and start server

8. **Testing**
   - Set up Vitest and Supertest
   - Install `mongodb-memory-server` for test database
   - Create test setup file (`vitest.config.ts`)
   - Write tests for:
     - `POST /api/tasks` (success and validation failure)
     - `GET /api/tasks/:id` (success and 404)
     - `GET /api/tasks` (returns list)
     - `PUT /api/tasks/:id` (success and 404)
     - `DELETE /api/tasks/:id` (success and 404)

9. **API Documentation**
   - Create initial OpenAPI spec (`docs/openapi.yaml`)
   - Document Task CRUD endpoints
   - Add request/response schemas
   - Include examples for each endpoint

## Deliverables

- ✅ Complete Task CRUD API
- ✅ Validation middleware working
- ✅ Error handling middleware working
- ✅ All endpoints tested
- ✅ API returns consistent response format
- ✅ OpenAPI spec created for Task endpoints

## Acceptance Criteria

- [ ] `POST /api/tasks` creates a task with valid data
- [ ] `POST /api/tasks` returns 400 for invalid data
- [ ] `GET /api/tasks/:id` returns task or 404
- [ ] `GET /api/tasks` returns array of tasks
- [ ] `PUT /api/tasks/:id` updates task or returns 404
- [ ] `DELETE /api/tasks/:id` deletes task or returns 404
- [ ] All endpoints return consistent JSON format
- [ ] Test coverage >80% for task endpoints
- [ ] Error responses follow standard format







