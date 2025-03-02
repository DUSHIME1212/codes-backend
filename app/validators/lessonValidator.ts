import { z } from "zod"

const createLessonSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string().url().optional(),
})

const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  videoUrl: z.string().url().optional(),
})

export const validateCreateLesson = (data: unknown) => createLessonSchema.parse(data)
export const validateUpdateLesson = (data: unknown) => updateLessonSchema.parse(data)

