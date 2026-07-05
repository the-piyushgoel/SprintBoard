export const APP_NAME = 'SprintBoard';

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*',
};

export const API_PATHS = {
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
};

export const TASK_STATUS = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
};

export const ANIMATION_DURATIONS = {
  FAST: 150, // ms
  NORMAL: 200, // ms
  SLOW: 250, // ms
};
