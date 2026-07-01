import logger from '../utils/logger.js';
import { AUTH, GENERAL } from '../constants/messages.js';
import {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from '../constants/httpStatus.js';

const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  let message = err.message || GENERAL.INTERNAL_ERROR;
  let errors = [];

  if (err.name === 'CastError') {
    statusCode = BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    message = field === 'email' ? AUTH.EMAIL_EXISTS : `Duplicate value for field: ${field}`;
  }

  if (err.name === 'ValidationError') {
    statusCode = BAD_REQUEST;
    message = GENERAL.VALIDATION_ERROR;
    errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = UNAUTHORIZED;
    message = AUTH.TOKEN_INVALID;
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = UNAUTHORIZED;
    message = AUTH.TOKEN_EXPIRED;
  }

  if (statusCode >= INTERNAL_SERVER_ERROR) {
    logger.error(`${statusCode} - ${message} - ${err.stack}`);
  } else {
    logger.warn(`${statusCode} - ${message}`);
  }

  const response = { success: false, message };

  if (errors.length > 0) {
    response.errors = errors;
  }

  if (process.env.NODE_ENV === 'development' && statusCode >= INTERNAL_SERVER_ERROR) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
