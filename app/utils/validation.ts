import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["CHILD", "PARENT", "ADMIN"]),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  favoriteThings: z.string().max(200).optional(),
})

export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  lessonId: z.string().uuid(),
})

