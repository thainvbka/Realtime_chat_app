import mongoose, { ConnectOptions } from 'mongoose';
import logger from '@/lib/winston';
import config from '@/config';

const clientOptions: ConnectOptions = {
  dbName: config.DB_NAME,
  appName: 'Realtime Chat App',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectDB = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection failed', error);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.error('MongoDB disconnection failed', error);
  }
};
