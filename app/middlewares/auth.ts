import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/auth"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ error: "Authentication required" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    ;(req as any).user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required" })
  }
  next()
}

