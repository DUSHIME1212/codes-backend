import { z } from "zod"

const createPaymentSchema = z.object({
  amount: z.number().positive(),
  lessonId: z.string().uuid(),
})

export const validateCreatePayment = (data: unknown) => createPaymentSchema.parse(data)

