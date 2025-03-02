import type { Request, Response } from "express"
import * as paymentService from "../services/paymentService"
import { validateCreatePayment } from "../validators/paymentValidator"

export async function createPayment(req: Request, res: Response) {
  try {
    const parentId = (req as any).user.id
    const validatedData = validateCreatePayment(req.body)
    const payment = await paymentService.createPayment(parentId, validatedData.amount, validatedData.lessonId)
    res.status(201).json(payment)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function getPaymentStatus(req: Request, res: Response) {
  try {
    const { paymentId } = req.params
    const status = await paymentService.getPaymentStatus(paymentId)
    res.json({ status })
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}

