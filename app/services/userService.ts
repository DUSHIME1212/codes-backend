import bcrypt from "bcrypt"
import prisma from "../configs/database"
import { generateToken } from "../configs/auth"

// Register a new user
import { Role } from "@prisma/client";

export async function register(userData: { email: string; password: string; role: Role }) {
  const { email, password, role } = userData

  // Check if user already exists
if (!email) {
  throw new Error("Email is required");
}

// Check if user already exists
const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    throw new Error("User already exists")
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  })

  return { id: user.id, email: user.email, role: user.role }
}

// Login a user
export async function login(email: string, password: string) {
  // Find the user
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid credentials")
  }

  // Generate a token
  const token = generateToken({ id: user.id, email: user.email, role: user.role })

  return token
}

// Get user profile
export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      child: true,
      parent: true,
      admin: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

// Update user profile
export async function updateProfile(userId: string, updateData: any) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    include: {
      child: true,
      parent: true,
      admin: true,
    },
  })

  return updatedUser
}
