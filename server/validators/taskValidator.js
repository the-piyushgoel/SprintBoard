import { body } from 'express-validator';

export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Task title must be between 3 and 100 characters')
    .escape(),

  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Task description cannot exceed 500 characters')
    .escape(),

  body('status')
    .optional()
    .trim()
    .isIn(['Todo', 'In Progress', 'Done'])
    .withMessage("Status must be one of: 'Todo', 'In Progress', 'Done'"),

  body('priority')
    .optional()
    .trim()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage("Priority must be one of: 'Low', 'Medium', 'High'"),

  body('dueDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date string')
    .custom((value) => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      if (new Date(value) < todayStart) {
        throw new Error('Due date cannot be in the past');
      }
      return true;
    }),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Category cannot exceed 30 characters')
    .escape(),
];

export const updateTaskValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Task title must be between 3 and 100 characters')
    .escape(),

  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Task description cannot exceed 500 characters')
    .escape(),

  body('status')
    .optional()
    .trim()
    .isIn(['Todo', 'In Progress', 'Done'])
    .withMessage("Status must be one of: 'Todo', 'In Progress', 'Done'"),

  body('priority')
    .optional()
    .trim()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage("Priority must be one of: 'Low', 'Medium', 'High'"),

  body('dueDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date string'),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Category cannot exceed 30 characters')
    .escape(),
];
