# Test Coverage Notes — Task Manager

## Testing Frameworks

- **Backend**: Vitest + Supertest for API endpoint testing
- **Frontend**: Jest + React Testing Library for component testing

## Test scope

### Backend Tests
- Unit tests for services and utils (Vitest)
- Integration tests (Vitest + Supertest) for API endpoints:
  - Create task success & failure
  - Get single task
  - List tasks with filters
  - Update task (including subtasks)
  - Delete task
- Mongoose model validation tests (optional)

### Frontend Tests
- Component tests (Jest + React Testing Library)
- Integration tests for user flows
- Snapshot tests for small, stable components

## Test commands

### Backend (Vitest)
From backend directory:

```bash
npm test          # runs Vitest
npm run test:watch
npm run test:coverage
```

### Frontend (Jest)
From frontend directory:

```bash
npm test          # runs Jest
npm run test:watch
npm run test:coverage
```

## Test setup

### Backend
- Use Vitest with Supertest for API testing
- Use an in-memory MongoDB for tests (mongodb-memory-server)
- Seed data using `beforeAll` hooks and cleanup using `afterEach`
- Keep tests deterministic and focused (one assertion per behavior)

### Frontend
- Use Jest with React Testing Library
- Mock API calls for component testing
- Test user interactions and component rendering

## Example Vitest + Supertest test (outline)

```ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";

describe("Tasks API", () => {
  beforeAll(async () => {
    // setup in-memory mongo
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("creates a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "test task" })
      .expect(201);
    expect(res.body.title).toBe("test task");
  });
});
```
