import type { Request, Response } from "express"
import * as lessonService from "../services/lessonService"
import { validateCreateLesson, validateUpdateLesson } from "../validators/lessonValidator"

// Get all lessons
export async function getAllLessons(req: Request, res: Response) {
  try {
    const lessons = await lessonService.getAllLessons()
    res.json(lessons)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

// Get a lesson by ID
export async function getLessonById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const lesson = await lessonService.getLessonById(id)
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" })
    }
    res.json(lesson)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

// Create a new lesson
export async function createLesson(req: Request, res: Response) {
  try {
    const adminId = (req as any).user.id
    const validatedData = validateCreateLesson(req.body)
    const lesson = await lessonService.createLesson(adminId, validatedData)
    res.status(201).json(lesson)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// Update a lesson
export async function updateLesson(req: Request, res: Response) {
  try {
    const { id } = req.params
    const validatedData = validateUpdateLesson(req.body)
    const updatedLesson = await lessonService.updateLesson(id, validatedData)
    res.json(updatedLesson)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// Delete a lesson
export async function deleteLesson(req: Request, res: Response) {
  try {
    const { id } = req.params
    await lessonService.deleteLesson(id)
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}

