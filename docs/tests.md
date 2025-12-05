# Test Coverage Notes — Task Manager

## Test scope

- Unit tests for services and utils
- Integration tests (Jest + Supertest) for API endpoints:
  - Create task success & failure
  - Get single task
  - List tasks with filters
  - Update task (including subtasks)
  - Delete task
- Mongoose model validation tests (optional)
- Snapshot tests for small, stable components (frontend)

## Test commands

From backend directory:

```bash
npm test          # runs Jest
npm run test:watch
npm run test:coverage
```

## Test setup

- Use an in-memory MongoDB for tests (mongodb-memory-server)
- Seed data using `beforeAll` hooks and cleanup using `afterEach`
- Keep tests deterministic and focused (one assertion per behavior)

## Example Jest + Supertest test (outline)

```ts
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

  test("creates a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "test task" })
      .expect(201);
    expect(res.body.title).toBe("test task");
  });
});
```
