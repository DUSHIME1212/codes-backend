import { Router } from 'express';
import userRoutes from './userRoutes';
import lessonRoutes from './lessonRoutes';
import gameRoutes from './gameRoutes';
import groupRoutes from './groupRoutes';
import paymentRoutes from './paymentRoutes';
import chatbotRoutes from './chatbotRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/lessons', lessonRoutes);
router.use('/games', gameRoutes);
router.use('/groups', groupRoutes);
router.use('/payments', paymentRoutes);
router.use('/chatbot', chatbotRoutes);

export default router;
