# Architecture Notes — Task Manager

## Overview

This project uses a small, pragmatic full-stack architecture:

- Backend (Express + TypeScript + Mongoose) exposes REST endpoints.
- Frontend (React + TypeScript) consumes the API.
- Clear separation of concerns via Controller → Service → Model layers.
- Centralized error handling and input validation (Zod or Joi).

## Folder Structure (backend)

```bash

src/
controllers/ → receive requests, call services, send responses
services/ → business logic, orchestrates models and utils
models/ → Mongoose schemas and static/model methods
routes/ → Express route definitions (route-level validation)
middlewares/ → error handler, request logger, validation, auth (if added)
utils/ → helpers (date formatting, filters, pagination)
config/ → env config loader
app.ts → express app setup (middlewares, routes)
server.ts → starts the server

```

## Data Models (high-level)

### Task

- `_id: ObjectId`
- `title: string` (required)
- `description?: string`
- `dueDate?: Date`
- `priority?: 'low' | 'medium' | 'high'`
- `tags?: string[]`
- `completed: boolean` (default false)
- `subtasks?: [{ id, title, completed }]`
- `projectId?: ObjectId` (ref: Project)
- `createdAt`, `updatedAt`

### Project

- `_id: ObjectId`
- `name: string`
- `description?: string`
- `createdAt`, `updatedAt`

## Data Flow

Client → Route (validation) → Controller → Service → Model (Mongoose) → MongoDB
Errors bubble up to centralized error middleware which logs and returns standard error responses.

## Design Decisions

- **Controller-Service pattern**: keeps controllers thin for easier testing.
- **TypeScript**: static types for safer refactor and clearer interfaces.
- **Mongoose**: schema-level validation and lean query helpers.
- **Jest + Supertest**: fast feedback for API endpoints.
- **Pagination & Filtering**: implement simple `limit`, `skip`, and query-based filters.

## Extensibility notes

- Add auth middleware with JWT for user-specific tasks.
- Add background jobs (Bull) for scheduled reminders.
- Add full-text search or Elastic for larger datasets.
