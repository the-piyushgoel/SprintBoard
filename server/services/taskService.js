import Task from '../models/Task.js';
import AppError from '../utils/AppError.js';
import { BAD_REQUEST, NOT_FOUND, FORBIDDEN } from '../constants/httpStatus.js';

// Regex escape helper function
const escapeRegex = (string) => {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

/**
 * Create a new task
 */
const createTask = async (taskData, userId) => {
  // Validate dueDate is not in the past (before start of today)
  if (taskData.dueDate) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    if (new Date(taskData.dueDate) < todayStart) {
      throw new AppError('Due date cannot be in the past', BAD_REQUEST);
    }
  }

  const task = await Task.create({
    ...taskData,
    createdBy: userId,
  });

  return task;
};

/**
 * Get tasks with pagination, search, filters, and whitelisted sorting
 */
const getTasks = async (userId, queryOptions = {}) => {
  const { status, priority, category, search, sort, page, limit } = queryOptions;

  // Initialize query mapping only non-archived tasks of the user
  const filterQuery = {
    createdBy: userId,
    isArchived: false,
  };

  // Apply filters
  if (status) {
    filterQuery.status = status;
  }
  if (priority) {
    filterQuery.priority = priority;
  }
  if (category) {
    filterQuery.category = category;
  }

  // Apply regex-safe search
  if (search) {
    const escapedSearch = escapeRegex(search);
    const searchRegex = new RegExp(escapedSearch, 'i');
    filterQuery.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
    ];
  }

  // Parse and validate sorting
  let sortQuery = { createdAt: -1 }; // default sort
  if (sort) {
    const [field, order] = sort.split(':');
    const whitelist = ['createdAt', 'updatedAt', 'dueDate', 'priority', 'title'];

    if (whitelist.includes(field)) {
      sortQuery = { [field]: order === 'asc' ? 1 : -1 };
    } else {
      throw new AppError(`Sorting by field '${field}' is not allowed`, BAD_REQUEST);
    }
  }

  // Parse and clamp pagination
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const skip = (parsedPage - 1) * parsedLimit;

  // Fetch counts and records
  const total = await Task.countDocuments(filterQuery);
  const tasks = await Task.find(filterQuery)
    .sort(sortQuery)
    .skip(skip)
    .limit(parsedLimit);

  const pages = Math.ceil(total / parsedLimit);
  const hasNext = parsedPage < pages;
  const hasPrev = parsedPage > 1;

  return {
    tasks,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      pages,
      hasNext,
      hasPrev,
    },
  };
};

/**
 * Get single task by ID with ownership verification
 */
const getTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task || task.isArchived) {
    throw new AppError('Task not found', NOT_FOUND);
  }

  if (task.createdBy.toString() !== userId) {
    throw new AppError('Access forbidden: You do not own this task', FORBIDDEN);
  }

  return task;
};

/**
 * Update task
 */
const updateTask = async (taskId, userId, updateData) => {
  const task = await getTaskById(taskId, userId); // Throws 404/403 if invalid

  // Apply allowed update properties
  const allowedUpdates = ['title', 'description', 'status', 'priority', 'dueDate', 'category'];
  allowedUpdates.forEach((field) => {
    if (updateData[field] !== undefined) {
      task[field] = updateData[field];
    }
  });

  await task.save();
  return task;
};

/**
 * Soft delete task by flagging isArchived
 */
const deleteTask = async (taskId, userId) => {
  const task = await getTaskById(taskId, userId);

  task.isArchived = true;
  await task.save();

  return task;
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
