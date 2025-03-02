import prisma from "../configs/database"
import bcrypt from "bcrypt"

async function seedDatabase() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    const admin = await prisma.user.create({
      data: {
        email: "admin@example.com",
        password: adminPassword,
        role: "ADMIN",
        admin: {
          create: {},
        },
      },
    })

    console.log("Admin user created:", admin.email)

    // Create sample lesson
    const lesson = await prisma.lesson.create({
      data: {
        title: "Introduction to Math",
        description: "Learn basic math concepts",
        videoUrl: "https://example.com/math-intro.mp4",
        admin: {
          connect: { id: admin.id },
        },
      },
    })

    console.log("Sample lesson created:", lesson.title)

    // Create sample game
    const game = await prisma.game.create({
      data: {
        title: "Math Challenge",
        description: "Test your math skills",
        gameUrl: "https://example.com/math-challenge",
        admin: {
          connect: { id: admin.id },
        },
      },
    })

    console.log("Sample game created:", game.title)

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()

