# Sprint 7: Frontend Advanced Features

**Duration:** Week 7  
**Goal:** Add filtering, sorting, projects, and subtasks UI

> **Testing Note:** Testing is part of this sprint! Write integration tests for all new features and user flows as you build them.

## Tasks

1. **Filter UI**
   - Create `components/FilterBar.tsx`
   - Add filter by priority (dropdown)
   - Add filter by completion status (toggle)
   - Add filter by tag (multi-select or chips)
   - Add filter by project (dropdown)
   - Update state/API calls when filters change
   - Show active filters with clear option

2. **Sort UI**
   - Create `components/SortDropdown.tsx` or add to FilterBar
   - Options: dueDate, priority, createdAt
   - Toggle ascending/descending
   - Update API call with sort parameter
   - Visual indicator of current sort

3. **Project Management**
   - Create `pages/ProjectsPage.tsx`
   - Create project list component
   - Create project form (create/edit)
   - Add project selection in task form
   - Display project name in task items
   - Link to filter by project

4. **Tag Management**
   - Create tag input component (autocomplete or chips)
   - Display tags on task items
   - Add tag filtering
   - Show tag count or color coding
   - Allow removing tags

5. **Subtasks UI**
   - Display subtasks in task detail/item
   - Create `components/SubtaskList.tsx`
   - Add "Add Subtask" form/button
   - Allow editing subtask title
   - Allow toggling subtask completion
   - Allow deleting subtasks
   - Visual indication of subtask progress

6. **Search Functionality** (Optional)
   - Add search input
   - Filter tasks by title/description
   - Highlight search terms
   - Clear search option

7. **Enhanced Task Display**
   - Show priority with color coding or icons
   - Show due date with relative time ("in 2 days")
   - Highlight overdue tasks
   - Show completion percentage (if subtasks exist)
   - Add task count badges

8. **Pagination UI** (if needed)
   - Add pagination controls
   - Show page numbers or load more button
   - Display total count
   - Handle page navigation

9. **State Management Enhancements**
   - Add filter state to store
   - Add sort state to store
   - Cache projects list
   - Optimize re-renders
   - Handle loading states for filters

10. **Testing**
    - Write component tests for FilterBar
    - Write component tests for SortDropdown
    - Write component tests for project management
    - Write component tests for subtask operations
    - Write integration tests for filtering flow
    - Write integration tests for sorting flow
    - Write integration tests for project creation and selection
    - Write integration tests for subtask CRUD operations
    - Test tag management functionality

## Deliverables

- ✅ All filters work in UI
- ✅ Sorting works in UI
- ✅ Projects can be managed
- ✅ Subtasks fully functional in UI
- ✅ Enhanced task display
- ✅ Smooth user experience
- ✅ Component and integration tests written for all new features

## Acceptance Criteria

- [ ] Filters update task list correctly
- [ ] Sort dropdown changes task order
- [ ] Projects can be created and selected
- [ ] Subtasks can be added, edited, and deleted
- [ ] Subtask completion toggles work
- [ ] Task display shows all relevant information
- [ ] UI remains responsive with many tasks
- [ ] All interactions provide visual feedback
- [ ] No performance issues with filtering/sorting
- [ ] Component tests pass for all new components
- [ ] Integration tests pass for all new user flows







