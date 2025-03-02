import { z } from "zod"

const chatMessageSchema = z.object({
  message: z.string().min(1),
})

export const validateChatMessage = (data: unknown) => chatMessageSchema.parse(data)

