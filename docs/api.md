# API Documentation — Task Manager (v1)

Base URL: `/api`

## Common headers

- `Content-Type: application/json`
- `Authorization: Bearer <token>` (if auth added)

---

## Task object (example)

```json
{
  "_id": "64a1f2...",
  "title": "Buy groceries",
  "description": "Milk, eggs, onions",
  "dueDate": "2025-12-10T10:00:00.000Z",
  "priority": "medium",
  "tags": ["shopping", "errands"],
  "completed": false,
  "subtasks": [{ "id": "s1", "title": "Buy milk", "completed": false }],
  "projectId": "64a2c3...",
  "createdAt": "2025-11-01T12:00:00.000Z",
  "updatedAt": "2025-11-01T12:05:00.000Z"
}
```

---

## Create Task

**POST** `/api/tasks`

### Body

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "dueDate": "ISO date (optional)",
  "priority": "low|medium|high (optional)",
  "tags": ["string"],
  "subtasks": [{ "title": "string" }],
  "projectId": "string (optional)"
}
```

### Responses

- `201 Created` — returns created task
- `400 Bad Request` — validation errors

---

## List Tasks (filter & sort)

**GET** `/api/tasks`

### Query params

- `projectId` — filter by project
- `tag` — filter by tag (single)
- `completed` — `true|false`
- `priority` — `low|medium|high`
- `dueBefore` — ISO date
- `sort` — `dueDate|priority|createdAt` (prefix `-` for desc)
- `limit` — integer
- `skip` — integer

### Responses

- `200 OK` — `{ total: number, limit, skip, tasks: [...] }`

---

## Get Single Task

**GET** `/api/tasks/:id`

### Responses

- `200 OK` — returns task
- `404 Not Found` — task missing

---

## Update Task

**PUT** `/api/tasks/:id`

### Body (partial or whole)

Same fields as create (all optional)

### Responses

- `200 OK` — returns updated task
- `400 Bad Request` — validation
- `404 Not Found`

---

## Delete Task

**DELETE** `/api/tasks/:id`

### Responses

- `204 No Content` — deleted
- `404 Not Found`

---

## Subtasks (options)

You can handle subtasks inline in `PUT /api/tasks/:id` or separate routes:

**POST** `/api/tasks/:id/subtasks`

- Body: `{ "title": "string" }`
- Response: `201 Created` — returns updated task

**PUT** `/api/tasks/:id/subtasks/:subtaskId`

- Body: `{ "title": "string", "completed": true }`

**DELETE** `/api/tasks/:id/subtasks/:subtaskId`

---

## Projects

**POST** `/api/projects`

- Body: `{ "name": "string", "description": "string" }`
- `201 Created`

**GET** `/api/projects`

- `200 OK` — list of projects

**PUT** `/api/projects/:id`, **DELETE** `/api/projects/:id` — standard responses

---

## Error format (standard)

```json
{
  "status": "error",
  "message": "Validation failed",
  "details": { "title": "Title is required" }
}
```
