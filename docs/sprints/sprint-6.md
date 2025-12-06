# Sprint 6: Frontend Task Management

**Duration:** Week 6  
**Goal:** Complete task CRUD in the UI

> **Testing Note:** Testing is part of this sprint! Write component and integration tests for all forms and CRUD operations as you build them.

## Tasks

1. **Create Task Form**
   - Create `components/TaskForm.tsx` or `components/CreateTaskModal.tsx`
   - Add form fields: title, description, dueDate, priority, tags, projectId
   - Add form validation (client-side)
   - Connect to API service
   - Show success/error messages
   - Reset form after successful creation

2. **Edit Task**
   - Create `components/EditTaskModal.tsx` or reuse TaskForm
   - Pre-populate form with existing task data
   - Handle update API call
   - Update state after successful edit
   - Close modal/form after save

3. **Delete Task**
   - Add delete button to TaskItem
   - Create confirmation dialog/modal
   - Handle delete API call
   - Remove task from state after deletion
   - Show success message

4. **Task Detail View**
   - Create `pages/TaskDetail.tsx` or expand TaskItem
   - Display all task fields
   - Show subtasks list
   - Add edit and delete actions
   - Add back navigation

5. **Form Components**
   - Create reusable `Input` component
   - Create `Select` component for priority
   - Create `DatePicker` component (or use library)
   - Create `TagInput` component for tags
   - Create `ProjectSelect` component

6. **Task Completion Toggle**
   - Add checkbox or button to toggle completion
   - Update task in state optimistically
   - Handle API call for completion toggle
   - Visual indication of completed tasks (strikethrough, different color)

7. **User Feedback**
   - Add toast notifications or snackbar
   - Show success messages for create/update/delete
   - Show error messages with details
   - Add loading states to buttons during API calls

8. **Form Validation**
   - Validate required fields (title)
   - Validate date format
   - Validate priority enum
   - Show inline error messages
   - Disable submit if invalid

9. **State Management Updates**
   - Add optimistic updates
   - Handle error rollback
   - Update state after all CRUD operations
   - Refresh task list after mutations

10. **Testing**
    - Write component tests for TaskForm
    - Write component tests for EditTaskModal
    - Write component tests for delete confirmation
    - Write integration tests for create task flow
    - Write integration tests for edit task flow
    - Write integration tests for delete task flow
    - Test form validation
    - Test error handling in forms
    - Test completion toggle functionality

## Deliverables

- ✅ Users can create tasks via form
- ✅ Users can edit tasks
- ✅ Users can delete tasks with confirmation
- ✅ Task completion can be toggled
- ✅ All forms validate input
- ✅ User feedback for all actions
- ✅ Component and integration tests written for all CRUD operations

## Acceptance Criteria

- [ ] Create task form validates and submits successfully
- [ ] Edit task form pre-populates and updates task
- [ ] Delete shows confirmation and removes task
- [ ] Task completion toggle works
- [ ] Form validation prevents invalid submissions
- [ ] Success/error messages display appropriately
- [ ] Loading states show during API calls
- [ ] All CRUD operations update UI immediately
- [ ] No form submission errors
- [ ] Component tests pass for all forms
- [ ] Integration tests pass for all CRUD flows
