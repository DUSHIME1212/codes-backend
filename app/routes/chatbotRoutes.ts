import { Router } from 'express';
import { getChatbotResponse } from '../controllers/chatbotController';

const router = Router();

router.post('/chat', getChatbotResponse);

export default router;
