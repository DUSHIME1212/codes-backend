import { Router } from 'express';
import { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup } from '../controllers/groupController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.post('/', authMiddleware, adminMiddleware, createGroup);
router.put('/:id', authMiddleware, adminMiddleware, updateGroup);
router.delete('/:id', authMiddleware, adminMiddleware, deleteGroup);

export default router;
