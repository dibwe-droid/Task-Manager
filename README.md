# Task Manager

## 🚀 Purpose

A small, reliable Task Manager for practicing full-stack fundamentals: a clean Node + TypeScript API with a simple React UI. Built to demonstrate well-structured code, clear docs, and testable flows.

## ✨ Features

- Create, read, update, delete tasks (CRUD)
- Task fields: title, description, dueDate, priority, tags, completed
- Subtasks (array of smaller tasks)
- Project / Folder grouping for tasks
- Mark tasks complete / incomplete
- Filter & sort (by due date, priority, project, tag)
- Basic validation + centralized error handling
- Vitest + Supertest tests for backend API
- Jest + React Testing Library tests for frontend
- TypeScript across backend and frontend
- Simple React frontend (Vite) with Context or Zustand state
- Docker-friendly and deployable to Render / Vercel

## 🧱 Tech Stack

- Backend: Node.js, TypeScript, Express, Mongoose (MongoDB)
- Frontend: React, TypeScript, Vite (or Create React App)
- Validation: Zod (schema validation)
- Testing: Vitest + Supertest (backend), Jest + React Testing Library (frontend)
- Linting: ESLint + Prettier
- Deployment: Render / Vercel / Docker
- Optional: Zustand for state management

## 📂 Project Structure

```
Task-Manager/
├── src/
│   ├── backend/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── middlewares/     # Express middlewares
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Configuration
│   │   ├── scripts/         # Utility scripts
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   └── frontend/
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── pages/       # Page components
│       │   ├── store/       # State management
│       │   ├── services/   # API services
│       │   ├── hooks/       # Custom hooks
│       │   ├── config/      # Frontend configuration
│       │   ├── App.tsx      # Main app component
│       │   └── main.tsx     # Entry point
│       └── ...
├── docs/                    # Documentation
├── .prettierrc              # Prettier configuration
├── .prettierignore          # Prettier ignore patterns
└── package.json             # Root package.json (workspaces)
```

## 🔌 Quick Start (dev)

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)

### Setup Steps

1. **Clone the repository** (if applicable)

2. **Install dependencies:**
   ```bash
   # Backend
   cd src/backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   - Copy `src/backend/.env.example` to `src/backend/.env`
   - Copy `src/frontend/.env.example` to `src/frontend/.env`
   - Update values in `.env` files (see Environment Variables section below)

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd src/backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd src/frontend
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `MONGO_URI`: MongoDB connection string (required)

#### Frontend (.env)
- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:3000/api)

## 📡 API Overview (high level)

- `POST /api/tasks` — Create task
- `GET /api/tasks` — List tasks (filter & sort query params)
- `GET /api/tasks/:id` — Get single task
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task
- `POST /api/projects` — Create project
- `GET /api/projects` — List projects
- `PUT /api/tasks/:id/subtasks` — Add / update subtasks (or use separate route)

See `docs/api.md` for full shapes and examples.

## 🧪 Tests

Run backend tests (Vitest):

```bash
cd src/backend
npm test
```

Run frontend tests (Jest):

```bash
cd src/frontend
npm test
```

## 🛠️ Development Tools

### Linting

```bash
# Backend
cd src/backend
npm run lint

# Frontend
cd src/frontend
npm run lint
```

### Formatting

```bash
# Format all files (from root)
npm run format

# Or format individual projects
cd src/backend && npm run format
cd src/frontend && npm run format
```

### Database Connection Test

```bash
cd src/backend
npm run test:db
```

### Logging

The application includes a structured logger utility (`src/backend/utils/logger.ts`) that provides:

- **Log Levels**: `error`, `warn`, `info`, `debug`
- **Structured Output**: JSON in production, human-readable in development
- **Context Support**: Add additional context to any log entry
- **Error Tracking**: Automatically captures error name, message, and stack trace

**Usage Examples:**

```typescript
import { logger } from './utils/logger';

// Basic error logging
logger.error('Operation failed', error);

// Error with context
logger.error('Task not found', error, { taskId: '123', method: 'GET' });

// Warning
logger.warn('Rate limit approaching', { userId: 'user123' });

// Info
logger.info('Task created', { taskId: '123' });

// Debug (only in development)
logger.debug('Query executed', { query: '...' });
```

See `src/backend/utils/logger.example.ts` for more examples.

## 🚀 Deployment

1. Use MongoDB Atlas and set `MONGO_URI` in environment.
2. Deploy backend on Render/Heroku/Render with Node 20.
3. Deploy frontend to Vercel/Netlify and point API base to backend.
   See `docs/deployment.md` for environment variables and provider notes.

## 📚 More docs

See `/docs` for:

- [Sprint Plan](docs/sprints.md) - 8-sprint breakdown with tasks and acceptance criteria
- [Architecture Notes](docs/architecture.md)
- [API Documentation](docs/api.md) - Markdown reference
- [OpenAPI Specification](docs/openapi.yaml) - OpenAPI 3.0 spec for Swagger UI
- [API Documentation Setup](docs/api-documentation.md) - How to set up Swagger UI
- [Test Coverage](docs/tests.md)
- [Deployment Guide](docs/deployment.md)
