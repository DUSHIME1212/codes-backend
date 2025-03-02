import jwt from "jsonwebtoken"

// Secret key for JWT
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// JWT expiration time
export const JWT_EXPIRES_IN = "1d"

// Generate a JWT token
export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify a JWT token
export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET)
}

