import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  logger.info(`MongoDB connected: ${conn.connection.host}`);

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB error: ${err.message}`);
  });
};

export default connectDB;
