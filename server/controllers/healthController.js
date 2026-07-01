import mongoose from 'mongoose';
import sendResponse from '../utils/sendResponse.js';
import { OK } from '../constants/httpStatus.js';
import { GENERAL } from '../constants/messages.js';

const DB_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

const getHealth = (_req, res) => {
  const healthData = {
    status: 'OK',
    uptime: process.uptime(),
    database: DB_STATES[mongoose.connection.readyState] || 'unknown',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  sendResponse(res, OK, GENERAL.HEALTH_OK, healthData);
};

export default { getHealth };
