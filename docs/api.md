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

- `projectId` — filter by project ID
- `tag` — filter by tag (single tag)
- `completed` — `true|false` — filter by completion status
- `priority` — `low|medium|high` — filter by priority
- `dueBefore` — ISO date string — filter tasks due before this date
- `sort` — `dueDate|priority|createdAt` (prefix `-` for descending, e.g., `-dueDate`)
- `limit` — integer (default: 20, max: 100) — maximum number of tasks to return
- `skip` — integer (default: 0) — number of tasks to skip for pagination

### Examples

Filter by priority:
```
GET /api/tasks?priority=high
```

Filter by multiple criteria:
```
GET /api/tasks?completed=false&tag=work&priority=high
```

Sort by due date (descending):
```
GET /api/tasks?sort=-dueDate
```

Paginate results:
```
GET /api/tasks?limit=10&skip=0
```

Combined filtering, sorting, and pagination:
```
GET /api/tasks?priority=high&completed=false&sort=-dueDate&limit=10&skip=0
```

### Responses

- `200 OK` — returns paginated response:
  ```json
  {
    "total": 42,
    "limit": 20,
    "skip": 0,
    "tasks": [...]
  }
  ```

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

### Project object (example)

```json
{
  "_id": "64a2c3...",
  "name": "Personal Tasks",
  "description": "Tasks for personal projects",
  "createdAt": "2025-11-01T10:00:00.000Z",
  "updatedAt": "2025-11-01T10:00:00.000Z"
}
```

---

### Create Project

**POST** `/api/projects`

#### Body

```json
{
  "name": "string (required)",
  "description": "string (optional)"
}
```

#### Responses

- `201 Created` — returns created project
- `400 Bad Request` — validation errors

---

### List Projects

**GET** `/api/projects`

#### Responses

- `200 OK` — returns array of projects

---

### Get Single Project

**GET** `/api/projects/:id`

#### Responses

- `200 OK` — returns project
- `404 Not Found` — project not found

---

### Update Project

**PUT** `/api/projects/:id`

#### Body (partial or whole)

```json
{
  "name": "string (optional)",
  "description": "string (optional)"
}
```

#### Responses

- `200 OK` — returns updated project
- `400 Bad Request` — validation errors
- `404 Not Found` — project not found

---

### Delete Project

**DELETE** `/api/projects/:id`

#### Responses

- `204 No Content` — project deleted
- `404 Not Found` — project not found

---

## Task-Project Relationship

Tasks can be associated with projects using the `projectId` field:

- When creating or updating a task with `projectId`, the project must exist
- If an invalid `projectId` is provided, the API returns `400 Bad Request` with message "Project not found"
- Tasks can be filtered by `projectId` using the query parameter: `GET /api/tasks?projectId=<projectId>`

---

## Error format (standard)

```json
{
  "status": "error",
  "message": "Validation failed",
  "details": { "title": "Title is required" }
}
```
