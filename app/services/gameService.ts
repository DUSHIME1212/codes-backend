import prisma from '../configs/database';

export async function getAllGames() {
  return prisma.game.findMany();
}

export async function getGameById(gameId: string) {
  return prisma.game.findUnique({
    where: { id: gameId },
  });
}

export async function createGame(adminId: string, data: { title: string; description: string; gameUrl: string }) {
  return prisma.game.create({
    data: {
      ...data,
      adminId,
    },
  });
}

export async function updateGame(gameId: string, data: { title?: string; description?: string; gameUrl?: string }) {
  return prisma.game.update({
    where: { id: gameId },
    data,
  });
}

export async function deleteGame(gameId: string) {
  return prisma.game.delete({
    where: { id: gameId },
  });
}

export async function getTopScores(gameId: string, limit = 10) {
  return prisma.enrollment.findMany({
    where: { gameId },
    orderBy: { score: 'desc' },
    take: limit,
    include: { child: true },
  });
}

export async function getRecentlyAddedGames(limit = 5) {
  return prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function searchGames(query: string) {
  return prisma.game.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
}
