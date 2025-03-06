import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.post('/', authMiddleware, adminMiddleware, gameController.createGame);
router.put('/:id', authMiddleware, adminMiddleware, gameController.updateGame);
router.delete('/:id', authMiddleware, adminMiddleware, gameController.deleteGame);

export default router;
