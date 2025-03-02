import { Router } from "express"
import { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } from "../controllers/lessonController"
import { authMiddleware, adminMiddleware } from "../middlewares/auth"

const router = Router()

router.get("/", getAllLessons)
router.get("/:id", getLessonById)
router.post("/", authMiddleware, adminMiddleware, createLesson)
router.put("/:id", authMiddleware, adminMiddleware, updateLesson)
router.delete("/:id", authMiddleware, adminMiddleware, deleteLesson)

export default router

