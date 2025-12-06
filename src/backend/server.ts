import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

// Connect to MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
    
    // Start server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`, {
        environment: config.nodeEnv,
        port: config.port,
      });
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB', { error: error.message });
    process.exit(1);
  });





