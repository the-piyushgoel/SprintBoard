import api from './api.js';
import { API_PATHS } from '../utils/constants.js';

/**
 * Register a new user
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.password
 * @returns {Promise<Object>} The API response containing user details
 */
export const register = (data) => {
  return api.post(API_PATHS.AUTH_REGISTER, data);
};

/**
 * Log in an existing user
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<Object>} The API response containing user details and setting httpOnly cookie
 */
export const login = (credentials) => {
  return api.post(API_PATHS.AUTH_LOGIN, credentials);
};

/**
 * Log out the currently authenticated user and clear cookies
 * @returns {Promise<Object>} The API response
 */
export const logout = () => {
  return api.post(API_PATHS.AUTH_LOGOUT);
};

/**
 * Retrieve currently authenticated user profile session
 * @returns {Promise<Object>} The API response containing user profile details
 */
export const getMe = () => {
  return api.get(API_PATHS.AUTH_ME);
};
