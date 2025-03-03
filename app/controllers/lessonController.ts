import type { Request, Response, NextFunction } from "express"
import * as lessonService from "../services/lessonService"
import { validateCreateLesson, validateUpdateLesson } from "../validators/lessonValidator"

export const getAllLessons = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lessons = await lessonService.getAllLessons()
    res.json(lessons)
  } catch (error) {
    next(error)
  }
}

export const getLessonById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const lesson = await lessonService.getLessonById(id)
    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" })
      return
    }
    res.json(lesson)
  } catch (error) {
    next(error)
  }
}

export const createLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminId = (req as any).user.id
    const validatedData = validateCreateLesson(req.body)
    const lesson = await lessonService.createLesson(adminId, validatedData)
    res.status(201).json(lesson)
  } catch (error) {
    next(error)
  }
}

export const updateLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const validatedData = validateUpdateLesson(req.body)
    const updatedLesson = await lessonService.updateLesson(id, validatedData)
    res.json(updatedLesson)
  } catch (error) {
    next(error)
  }
}

export const deleteLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    await lessonService.deleteLesson(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

