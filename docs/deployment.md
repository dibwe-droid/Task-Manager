# Deployment Notes

## Environment variables (example)

- `NODE_ENV=production`
- `PORT=3000`
- `MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/task-manager`
- `JWT_SECRET=<if auth>`
- `FRONTEND_URL=https://your-frontend.example.com`

## Deploy Backend (Render / Heroku / Railway)

1. Push `main` branch to GitHub
2. Connect repo to Render (or provider)
3. Set build command: `npm install && npm run build`
4. Start command: `node dist/server.js` (or `npm start`)
5. Set environment vars in provider dashboard

## Deploy Frontend (Vercel / Netlify)

- Configure environment variable `REACT_APP_API_BASE_URL` (or similar)
- Deploy directly from repo (Vite or CRA build)

## Docker (optional)

`Dockerfile` (simple)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/server.js"]
```

```bash
Build & run:

docker build -t task-manager .
docker run -e MONGO_URI=... -p 3000:3000 task-manager
```

## Notes

- Use MongoDB Atlas for production DB
- Consider backups and automatic scaling if traffic grows
- Configure CORS to allow frontend origin

# Folder structure (copy-ready)

```
/task-manager
README.md
package.json
tsconfig.json
.env.example
docs/
architecture.md
api.md
tests.md
deployment.md
src/
backend/
app.ts
server.ts
config/
index.ts
controllers/
task.controller.ts
project.controller.ts
services/
task.service.ts
project.service.ts
models/
task.model.ts
project.model.ts
routes/
tasks.routes.ts
projects.routes.ts
middlewares/
error.middleware.ts
validate.middleware.ts
utils/
filter.util.ts
frontend/
package.json
src/
main.tsx
App.tsx
components/
pages/
services/
store/
tests/
backend/

```
