export const APP_PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV || "development"
export const API_PREFIX = "/api/v1"

export const CORS_OPTIONS = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

export const RATE_LIMIT_OPTIONS = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}

