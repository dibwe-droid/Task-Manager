# Sprint 1: Project Setup & Foundation

**Duration:** Week 1  
**Goal:** Set up development environment and project structure

## Tasks

1. **Initialize Project Structure**
   - Create monorepo folder structure (`src/backend`, `src/frontend`)
   - Set up root `package.json` (optional: workspaces)
   - Create `.gitignore` file
   - Initialize Git repository

2. **Backend Setup**
   - Initialize `src/backend` with `npm init`
   - Install dependencies: `express`, `mongoose`, `dotenv`, `cors`, `zod`
   - Install dev dependencies: `typescript`, `@types/node`, `@types/express`, `@types/cors`, `ts-node-dev`, `nodemon`
   - Create `tsconfig.json` for backend
   - Set up folder structure: `controllers/`, `services/`, `models/`, `routes/`, `middlewares/`, `utils/`, `config/`
   - Create `app.ts` and `server.ts` skeleton files
   - Add npm scripts: `dev`, `build`, `start`, `test`

3. **Frontend Setup**
   - Initialize `src/frontend` with Vite + React + TypeScript template
   - Install additional dependencies: `axios` (or fetch), `react-router-dom` (if needed)
   - Create folder structure: `components/`, `pages/`, `store/`, `services/`, `hooks/`
   - Configure `tsconfig.json` for frontend
   - Add npm scripts: `dev`, `build`, `preview`

4. **Development Tools**
   - Set up ESLint for both backend and frontend
   - Set up Prettier with shared config
   - Configure `.prettierrc` and `.eslintrc`
   - Add format scripts to package.json

5. **Environment Configuration**
   - Create `.env.example` for backend (MONGO_URI, PORT, NODE_ENV)
   - Create `.env.example` for frontend (VITE_API_BASE_URL)
   - Set up `config/index.ts` for environment variable loading
   - Document environment variables in README

6. **Database Setup**
   - Create MongoDB Atlas account (or set up local MongoDB)
   - Create database and get connection string
   - Test connection in a simple script
   - Document connection setup

7. **Documentation**
   - Update README with setup instructions
   - Document folder structure
   - Add quick start guide

## Deliverables

- ✅ Project structure matches architecture docs
- ✅ Both backend and frontend can run (`npm run dev`)
- ✅ TypeScript compiles without errors
- ✅ ESLint and Prettier configured
- ✅ MongoDB connection string ready
- ✅ `.env.example` files created
- ✅ README updated with setup steps

## Acceptance Criteria

- [ ] `cd src/backend && npm run dev` starts server without errors
- [ ] `cd src/frontend && npm run dev` starts React app
- [ ] TypeScript compiles successfully in both projects
- [ ] ESLint passes with no errors
- [ ] MongoDB connection can be established
- [ ] All environment variables documented in `.env.example`
- [ ] Git repository initialized and first commit made
