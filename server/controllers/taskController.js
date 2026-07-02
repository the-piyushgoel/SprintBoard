import taskService from '../services/taskService.js';
import sendResponse from '../utils/sendResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK, CREATED } from '../constants/httpStatus.js';

/**
 * Controller to handle task creation
 */
const create = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user.id);
  return sendResponse(res, CREATED, 'Task created successfully', { task });
});

/**
 * Controller to list all tasks with sorting, filtering, searching, and pagination
 */
const list = asyncHandler(async (req, res) => {
  const result = await taskService.getTasks(req.user.id, req.query);
  return sendResponse(res, OK, 'Tasks retrieved successfully', result);
});

/**
 * Controller to fetch a single task by ID
 */
const getOne = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user.id);
  return sendResponse(res, OK, 'Task retrieved successfully', { task });
});

/**
 * Controller to update a task by ID
 */
const update = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
  return sendResponse(res, OK, 'Task updated successfully', { task });
});

/**
 * Controller to soft delete a task by ID
 */
const deleteOne = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user.id);
  return sendResponse(res, OK, 'Task deleted successfully');
});

export default {
  create,
  list,
  getOne,
  update,
  deleteOne,
};
