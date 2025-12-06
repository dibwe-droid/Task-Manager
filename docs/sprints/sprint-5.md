# Sprint 5: Frontend Setup & Basic UI

**Duration:** Week 5  
**Goal:** Set up React frontend and create basic task list

> **Testing Note:** Testing is part of this sprint! Set up testing framework and write basic component tests as you build components.

## Tasks

1. **API Service Layer**
   - Create `services/api.ts` or `services/taskApi.ts`
   - Set up fetch utility with base URL configuration
   - Create functions: `getTasks()`, `getTask(id)`, `createTask()`, `updateTask()`, `deleteTask()`
   - Add error handling for API calls
   - Create TypeScript interfaces matching backend models

2. **State Management Setup**
   - Choose: Context API or Zustand
   - If Context: Create `store/TaskContext.tsx` with provider
   - If Zustand: Create `store/taskStore.ts`
   - Set up initial state structure
   - Create actions: `fetchTasks`, `addTask`, `updateTask`, `deleteTask`

3. **Basic Components**
   - Create `components/TaskList.tsx` (displays list of tasks)
   - Create `components/TaskItem.tsx` (individual task card)
   - Create `components/Loading.tsx` (loading spinner)
   - Create `components/Error.tsx` (error message display)

4. **Pages**
   - Create `pages/Home.tsx` or `pages/TaskListPage.tsx`
   - Set up routing (if using React Router)
   - Connect page to state management
   - Fetch tasks on component mount

5. **Styling Setup**
   - Choose: CSS Modules, Tailwind, or styled-components
   - Set up styling approach
   - Create basic layout components
   - Add responsive design basics

6. **App Structure**
   - Update `App.tsx` with routing and providers
   - Set up main layout (header, main content area)
   - Configure API base URL from environment

7. **Basic Styling**
   - Style task list and task items
   - Add basic colors and typography
   - Make layout responsive (mobile-friendly)
   - Add hover states and transitions

8. **Error Handling**
   - Display error messages to user
   - Handle network errors gracefully
   - Show loading states during API calls

9. **Testing Setup**
   - Set up Jest + React Testing Library
   - Configure Jest for React/TypeScript
   - Write basic tests for TaskList component
   - Write basic tests for TaskItem component
   - Test API service functions (mock API calls)
   - Test loading and error states

## Deliverables

- ✅ React app running and connected to backend
- ✅ Task list displays tasks from API
- ✅ Basic styling applied
- ✅ Loading and error states handled
- ✅ Responsive layout
- ✅ Testing framework set up
- ✅ Basic component tests written

## Acceptance Criteria

- [ ] Frontend runs on dev server (`npm run dev`)
- [ ] Tasks are fetched from backend API on page load
- [ ] Task list displays all tasks
- [ ] Each task shows: title, description, priority, due date
- [ ] Loading spinner shows while fetching
- [ ] Error messages display if API fails
- [ ] UI is responsive (works on mobile)
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Testing framework configured and working
- [ ] Basic component tests pass






