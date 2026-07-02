import { Router } from 'express';
import taskController from '../controllers/taskController.js';
import { createTaskValidator, updateTaskValidator } from '../validators/taskValidator.js';
import validate from '../validators/validate.js';
import authenticateUser from '../middlewares/authenticate.js';

const router = Router();

// Secure all task endpoints
router.use(authenticateUser);

router.post('/', createTaskValidator, validate, taskController.create);
router.get('/', taskController.list);
router.get('/:id', taskController.getOne);
router.put('/:id', updateTaskValidator, validate, taskController.update);
router.delete('/:id', taskController.deleteOne);

export default router;
