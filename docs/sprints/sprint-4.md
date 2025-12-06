# Sprint 4: Backend Subtasks & Polish

**Duration:** Week 4  
**Goal:** Add subtasks functionality and complete backend

> **Testing Note:** Testing is part of this sprint! Write tests for subtasks and edge cases as you build them (see Task 7).

## Tasks

1. **Subtask Model Enhancement**
   - Update Task model to include `subtasks` array
   - Define subtask schema: `{ id: string, title: string, completed: boolean }`
   - Add validation for subtasks array

2. **Subtask Service Methods**
   - Add `addSubtask(taskId, subtaskData)` to task service
   - Add `updateSubtask(taskId, subtaskId, updates)` to task service
   - Add `deleteSubtask(taskId, subtaskId)` to task service
   - Add `toggleSubtask(taskId, subtaskId)` helper

3. **Subtask Routes**
   - Create `POST /api/tasks/:id/subtasks` route
   - Create `PUT /api/tasks/:id/subtasks/:subtaskId` route
   - Create `DELETE /api/tasks/:id/subtasks/:subtaskId` route
   - Add validation for subtask data

4. **Task Completion Toggle**
   - Add `PATCH /api/tasks/:id/complete` route (or handle in PUT)
   - Update service to toggle `completed` field
   - Optionally auto-complete subtasks when parent completes

5. **Enhanced Validation**
   - Add validation for subtask operations
   - Validate task exists before subtask operations
   - Validate subtask exists before update/delete

6. **Error Handling Improvements**
   - Add more specific error messages
   - Handle edge cases (e.g., deleting non-existent subtask)
   - Improve error logging

7. **Testing**
   - Write tests for all subtask endpoints
   - Test subtask validation
   - Test task completion toggle
   - Test edge cases and error scenarios
   - Achieve >85% test coverage

8. **API Documentation**
   - Update OpenAPI spec with subtask endpoints
   - Update `docs/api.md` with subtask endpoints
   - Document request/response examples
   - Document error codes

9. **Code Quality**
   - Review and refactor code
   - Ensure consistent code style
   - Add JSDoc comments to public methods
   - Remove any console.logs, use proper logging

## Deliverables

- ✅ Subtasks fully functional (CRUD)
- ✅ Task completion toggle works
- ✅ All edge cases handled
- ✅ Comprehensive test coverage
- ✅ API documentation complete
- ✅ Code is clean and well-documented

## Acceptance Criteria

- [ ] `POST /api/tasks/:id/subtasks` adds subtask
- [ ] `PUT /api/tasks/:id/subtasks/:subtaskId` updates subtask
- [ ] `DELETE /api/tasks/:id/subtasks/:subtaskId` deletes subtask
- [ ] Task completion can be toggled
- [ ] Invalid subtask operations return appropriate errors
- [ ] All subtask endpoints tested
- [ ] Test coverage >85%
- [ ] API docs updated with subtask examples
- [ ] No console.logs in production code







