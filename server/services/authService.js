import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { CONFLICT, UNAUTHORIZED, NOT_FOUND } from '../constants/httpStatus.js';
import { AUTH } from '../constants/messages.js';

/**
 * Register a new user
 * @param {Object} userData
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @returns {Promise<Object>} The created user document
 */
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(AUTH.EMAIL_EXISTS, CONFLICT);
  }

  const user = await User.create({ name, email, password });
  return user;
};

/**
 * Login an existing user
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<Object>} The authenticated user document
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(AUTH.INVALID_CREDENTIALS, UNAUTHORIZED);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError(AUTH.INVALID_CREDENTIALS, UNAUTHORIZED);
  }

  return user;
};

/**
 * Fetch authenticated user by ID
 * @param {string} userId
 * @returns {Promise<Object>} The user document (excluding password)
 */
const getAuthenticatedUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(AUTH.USER_NOT_FOUND, NOT_FOUND);
  }
  return user;
};

export default {
  registerUser,
  loginUser,
  getAuthenticatedUser,
};
