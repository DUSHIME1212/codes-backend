import type { Request, Response, NextFunction } from 'express';
import * as groupService from '../services/groupService';
import { validateCreateGroup, validateUpdateGroup } from '../validators/groupValidator';

export const getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const groups = await groupService.getAllGroups();
    res.json(groups);
  } catch (error) {
    next(error);
  }
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);
    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }
    res.json(group);
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = validateCreateGroup(req.body);
    const group = await groupService.createGroup(validatedData);
    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = validateUpdateGroup(req.body);
    const updatedGroup = await groupService.updateGroup(id, validatedData);
    res.json(updatedGroup);
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await groupService.deleteGroup(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
