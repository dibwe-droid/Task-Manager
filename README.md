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

## 📂 Project Structure (recommended)

```
Task-Manager/
├── src/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── store/
│       │   ├── services/
│       │   ├── hooks/
│       │   ├── App.tsx
│       │   └── main.tsx
├── tests/
├── docs/
├── .env.example
└── package.json
```

## 🔌 Quick Start (dev)

```bash
# clone
npm install
# run backend
cd src/backend
npm run dev
# run frontend (separate terminal)
cd src/frontend
npm install
npm run dev
```

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
