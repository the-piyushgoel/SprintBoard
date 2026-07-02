import api from './api.js';

/**
 * Retrieve a paginated and filtered list of tasks
 * @param {Object} params - Query filters (status, priority, search, sort, page, limit)
 * @returns {Promise<Object>} The API response containing tasks and pagination metadata
 */
export const getTasks = (params) => {
  return api.get('/tasks', { params });
};

/**
 * Retrieve a single task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object>} The API response containing task details
 */
export const getTask = (id) => {
  return api.get(`/tasks/${id}`);
};

/**
 * Create a new task
 * @param {Object} data - Task payload
 * @returns {Promise<Object>} The API response containing the created task
 */
export const createTask = (data) => {
  return api.post('/tasks', data);
};

/**
 * Update an existing task by ID
 * @param {string} id - Task ID
 * @param {Object} data - Update payload
 * @returns {Promise<Object>} The API response containing the updated task
 */
export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

/**
 * Soft delete a task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object>} The API response confirming deletion
 */
export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};
