import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

export default router;
