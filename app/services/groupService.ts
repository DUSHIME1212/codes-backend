import prisma from "../configs/database"

export async function getAllGroups() {
  return prisma.group.findMany()
}

export async function getGroupById(groupId: string) {
  return prisma.group.findUnique({
    where: { id: groupId },
    include: { members: { include: { child: true } } },
  })
}

export async function createGroup(data: { name: string; description?: string }) {
  return prisma.group.create({
    data,
  })
}

export async function updateGroup(groupId: string, data: { name?: string; description?: string }) {
  return prisma.group.update({
    where: { id: groupId },
    data,
  })
}

export async function deleteGroup(groupId: string) {
  return prisma.group.delete({
    where: { id: groupId },
  })
}

export async function addMemberToGroup(groupId: string, childId: string) {
  return prisma.groupMember.create({
    data: {
      groupId,
      childId,
    },
  })
}

export async function removeMemberFromGroup(groupId: string, childId: string) {
  return prisma.groupMember.deleteMany({
    where: {
      groupId,
      childId,
    },
  })
}

export async function getGroupMembers(groupId: string) {
  return prisma.groupMember.findMany({
    where: { groupId },
    include: { child: true },
  })
}

export async function searchGroups(query: string) {
  return prisma.group.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  })
}

