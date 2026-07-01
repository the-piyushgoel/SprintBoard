import sendResponse from './sendResponse.js';

const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    path: '/',
  };

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  res.cookie('token', token, cookieOptions);
  return sendResponse(res, statusCode, message, { user: userData });
};

export default sendToken;
