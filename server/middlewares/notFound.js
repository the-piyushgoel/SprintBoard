import AppError from '../utils/AppError.js';
import { NOT_FOUND } from '../constants/httpStatus.js';
import { GENERAL } from '../constants/messages.js';

const notFound = (req, _res, next) => {
  next(new AppError(`${GENERAL.NOT_FOUND}: ${req.method} ${req.originalUrl}`, NOT_FOUND));
};

export default notFound;
