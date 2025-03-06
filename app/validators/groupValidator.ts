import { z } from 'zod';

const createGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const updateGroupSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const validateCreateGroup = (data: unknown) => createGroupSchema.parse(data);
export const validateUpdateGroup = (data: unknown) => updateGroupSchema.parse(data);
