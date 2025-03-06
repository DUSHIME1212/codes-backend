import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['CHILD', 'PARENT', 'ADMIN']),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  favoriteThings: z.string().max(200).optional(),
});

export const validateRegister = (data: unknown) => registerSchema.parse(data);
export const validateLogin = (data: unknown) => loginSchema.parse(data);
export const validateUpdateProfile = (data: unknown) => updateProfileSchema.parse(data);
