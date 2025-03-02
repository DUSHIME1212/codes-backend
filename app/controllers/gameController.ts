import type { Request, Response, NextFunction } from "express"
import * as gameService from "../services/gameService"
import { validateCreateGame, validateUpdateGame } from "../validators/gameValidator"

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await gameService.getAllGames()
    res.json(games)
  } catch (error) {
    next(error)
  }
}

export const getGameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const game = await gameService.getGameById(id)
    if (!game) {
      return res.status(404).json({ error: "Game not found" })
    }
    res.json(game)
  } catch (error) {
    next(error)
  }
}

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = (req as any).user.id
    const validatedData = validateCreateGame(req.body)
    const game = await gameService.createGame(adminId, validatedData)
    res.status(201).json(game)
  } catch (error) {
    next(error)
  }
}

export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const validatedData = validateUpdateGame(req.body)
    const updatedGame = await gameService.updateGame(id, validatedData)
    res.json(updatedGame)
  } catch (error) {
    next(error)
  }
}

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await gameService.deleteGame(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

