import authService from '../services/authService.js';
import sendToken from '../utils/sendToken.js';
import sendResponse from '../utils/sendResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK, CREATED } from '../constants/httpStatus.js';
import { AUTH } from '../constants/messages.js';

/**
 * Controller to handle user registration
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser({ name, email, password });
  return sendToken(user, CREATED, AUTH.REGISTER_SUCCESS, res);
});

/**
 * Controller to handle user login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser({ email, password });
  return sendToken(user, OK, AUTH.LOGIN_SUCCESS, res);
});

/**
 * Controller to handle user logout
 */
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });
  return sendResponse(res, OK, AUTH.LOGOUT_SUCCESS);
});

/**
 * Controller to retrieve currently authenticated user profile
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getAuthenticatedUser(req.user.id);
  return sendResponse(res, OK, AUTH.PROFILE_FETCH_SUCCESS, { user });
});

export default {
  register,
  login,
  logout,
  getMe,
};
