import type { Request, Response } from "express"
import * as userService from "../services/userService"
import { validateRegister, validateLogin, validateUpdateProfile } from "../validators/userValidator"

export async function register(req: Request, res: Response) {
  try {
    const validatedData = validateRegister(req.body)
    const user = await userService.register(validatedData)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = validateLogin(req.body)
    const token = await userService.login(email, password)
    res.json({ token })
  } catch (error) {
    res.status(401).json({ error: (error as Error).message })
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id
    const profile = await userService.getProfile(userId)
    res.json(profile)
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id
    const validatedData = validateUpdateProfile(req.body)
    const updatedProfile = await userService.updateProfile(userId, validatedData)
    res.json(updatedProfile)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

