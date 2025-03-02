import { z } from "zod"

const createGameSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  gameUrl: z.string().url(),
})

const updateGameSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  gameUrl: z.string().url().optional(),
})

export const validateCreateGame = (data: unknown) => createGameSchema.parse(data)
export const validateUpdateGame = (data: unknown) => updateGameSchema.parse(data)

