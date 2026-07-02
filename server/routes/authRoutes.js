import { Router } from 'express';
import authController from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import validate from '../validators/validate.js';
import authenticateUser from '../middlewares/authenticate.js';

const router = Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateUser, authController.getMe);

export default router;

