import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.routes';
import projectRoutes from './routes/projects.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;





