import { validationResult } from 'express-validator';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { GENERAL } from '../constants/messages.js';

/**
 * Reusable middleware to validate request parameters and body using express-validator.
 * Formats validation errors to follow the standard API error response contract.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  return res.status(BAD_REQUEST).json({
    success: false,
    message: GENERAL.VALIDATION_ERROR,
    errors: formattedErrors,
  });
};

export default validate;
