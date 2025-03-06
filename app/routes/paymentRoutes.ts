import { Router } from 'express';
import { createPayment, getPaymentStatus } from '../controllers/paymentController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/create', authMiddleware, createPayment);
router.get('/status/:paymentId', authMiddleware, getPaymentStatus);

export default router;
