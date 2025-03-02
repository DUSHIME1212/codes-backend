import prisma from "../configs/database"

// Get all lessons
export async function getAllLessons() {
  return prisma.lesson.findMany({
    include: {
      ratings: {
        select: {
          rating: true,
        },
      },
    },
  })
}

// Get a lesson by ID
export async function getLessonById(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      ratings: true,
      challenges: true,
      quizzes: {
        include: {
          questions: true,
        },
      },
    },
  })
}

// Create a new lesson
export async function createLesson(adminId: string, data: { title: string; description: string; videoUrl?: string }) {
  return prisma.lesson.create({
    data: {
      ...data,
      adminId,
    },
  })
}

// Update a lesson
export async function updateLesson(
  lessonId: string,
  data: { title?: string; description?: string; videoUrl?: string },
) {
  return prisma.lesson.update({
    where: { id: lessonId },
    data,
  })
}

// Delete a lesson
export async function deleteLesson(lessonId: string) {
  return prisma.lesson.delete({
    where: { id: lessonId },
  })
}

// Add a challenge to a lesson
export async function addChallenge(lessonId: string, data: { title: string; description: string }) {
  return prisma.challenge.create({
    data: {
      ...data,
      lessonId,
    },
  })
}

// Add a quiz to a lesson
export async function addQuiz(
  lessonId: string,
  data: { title: string; questions: { content: string; options: string[]; answer: string }[] },
) {
  return prisma.quiz.create({
    data: {
      title: data.title,
      lessonId,
      questions: {
        create: data.questions,
      },
    },
    include: {
      questions: true,
    },
  })
}

// Get lesson ratings
export async function getLessonRatings(lessonId: string) {
  return prisma.lessonRating.findMany({
    where: { lessonId },
    include: { parent: true },
  })
}

// Get recently added lessons
export async function getRecentlyAddedLessons(limit = 5) {
  return prisma.lesson.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      ratings: {
        select: {
          rating: true,
        },
      },
    },
  })
}

// Search lessons
export async function searchLessons(query: string) {
  return prisma.lesson.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      ratings: {
        select: {
          rating: true,
        },
      },
    },
  })
}

