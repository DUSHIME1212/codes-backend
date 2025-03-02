import type { Request, Response } from "express"
import * as groupService from "../services/groupService"
import { validateCreateGroup, validateUpdateGroup } from "../validators/groupValidator"

export async function getAllGroups(req: Request, res: Response) {
  try {
    const groups = await groupService.getAllGroups()
    res.json(groups)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export async function getGroupById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const group = await groupService.getGroupById(id)
    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }
    res.json(group)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export async function createGroup(req: Request, res: Response) {
  try {
    const validatedData = validateCreateGroup(req.body)
    const group = await groupService.createGroup(validatedData)
    res.status(201).json(group)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function updateGroup(req: Request, res: Response) {
  try {
    const { id } = req.params
    const validatedData = validateUpdateGroup(req.body)
    const updatedGroup = await groupService.updateGroup(id, validatedData)
    res.json(updatedGroup)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function deleteGroup(req: Request, res: Response) {
  try {
    const { id } = req.params
    await groupService.deleteGroup(id)
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}

