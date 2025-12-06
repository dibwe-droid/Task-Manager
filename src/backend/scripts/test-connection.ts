import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../utils/logger';

async function testConnection() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connection successful', {
      uri: config.mongoUri.replace(/\/\/.*@/, '//***:***@'), // Hide credentials
    });
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error('MongoDB connection failed', error as Error, {
      uri: config.mongoUri.replace(/\/\/.*@/, '//***:***@'), // Hide credentials
    });
    process.exit(1);
  }
}

testConnection();





