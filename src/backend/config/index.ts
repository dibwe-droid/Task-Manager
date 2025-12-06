import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || '',
};

// Validate required environment variables
if (!config.mongoUri) {
  throw new Error('MONGO_URI is required');
}





