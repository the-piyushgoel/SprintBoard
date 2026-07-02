import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import User from '../models/User.js';
import { UNAUTHORIZED } from '../constants/httpStatus.js';
import { AUTH } from '../constants/messages.js';

const authenticateUser = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError(AUTH.UNAUTHORIZED, UNAUTHORIZED);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError(AUTH.TOKEN_EXPIRED, UNAUTHORIZED);
    }
    throw new AppError(AUTH.TOKEN_INVALID, UNAUTHORIZED);
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError(AUTH.UNAUTHORIZED, UNAUTHORIZED);
  }

  req.user = user;
  next();
});

export default authenticateUser;
