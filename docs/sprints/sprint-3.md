# Sprint 3: Backend Advanced Features

**Duration:** Week 3  
**Goal:** Add filtering, sorting, pagination, and Projects API

> **Testing Note:** Testing is part of this sprint! Write tests for all new features as you build them (see Task 9).

## Tasks

1. **Filtering Logic**
   - Create `utils/filter.util.ts`
   - Implement query builder for MongoDB filters
   - Support filters: `projectId`, `tag`, `completed`, `priority`, `dueBefore`
   - Update `getAllTasks()` service to accept filter object
   - Update controller to parse query parameters

2. **Sorting Logic**
   - Add sorting to query builder
   - Support sorting by: `dueDate`, `priority`, `createdAt`
   - Support ascending/descending (prefix `-` for desc)
   - Update service and controller

3. **Pagination**
   - Add `limit` and `skip` query parameters
   - Update `getAllTasks()` to return: `{ total, limit, skip, tasks }`
   - Calculate total count for pagination metadata
   - Add default limit (e.g., 20)

4. **Project Model**
   - Create `models/project.model.ts`
   - Define fields: `name` (required), `description`, `createdAt`, `updatedAt`
   - Add schema validation

5. **Project Service**
   - Create `services/project.service.ts`
   - Implement `createProject()`, `getProjectById()`, `getAllProjects()`, `updateProject()`, `deleteProject()`

6. **Project Controller**
   - Create `controllers/project.controller.ts`
   - Implement all CRUD controllers for projects

7. **Project Routes**
   - Create `routes/projects.routes.ts`
   - Define all project CRUD routes
   - Add validation middleware

8. **Task-Project Relationship**
   - Update Task model to reference Project (ObjectId ref)
   - Validate `projectId` exists when creating/updating tasks
   - Add populate option for project details (optional)

9. **Testing**
   - Write tests for filtering (each filter type)
   - Write tests for sorting (each sort option)
   - Write tests for pagination
   - Write tests for Project CRUD
   - Write tests for task-project relationship

10. **API Documentation**
    - Update OpenAPI spec with filtering/sorting query parameters
    - Add Project endpoints to OpenAPI spec
    - Update `docs/api.md` with new endpoints
    - Add examples for filtered/sorted requests

## Deliverables

- ✅ Filtering works for all supported fields
- ✅ Sorting works for all supported fields
- ✅ Pagination returns correct metadata
- ✅ Project CRUD API complete
- ✅ Tasks can be linked to projects
- ✅ All new features tested
- ✅ OpenAPI spec updated with new endpoints

## Acceptance Criteria

- [ ] `GET /api/tasks?priority=high` filters correctly
- [ ] `GET /api/tasks?completed=false&tag=work` applies multiple filters
- [ ] `GET /api/tasks?sort=-dueDate` sorts correctly
- [ ] `GET /api/tasks?limit=10&skip=0` paginates correctly
- [ ] `POST /api/projects` creates project
- [ ] `GET /api/projects` returns all projects
- [ ] Tasks can be created with `projectId`
- [ ] Invalid `projectId` returns validation error
- [ ] All new endpoints have tests
- [ ] Response includes pagination metadata
