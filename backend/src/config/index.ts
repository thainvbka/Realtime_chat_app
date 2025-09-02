import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
};

export default config;
