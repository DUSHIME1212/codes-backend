import type { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { validateRegister, validateLogin, validateUpdateProfile } from '../validators/userValidator';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Received registration request:', {
      body: req.body,
      headers: req.headers,
    });
    console.log('Received body:', JSON.stringify(req.body));
    const validatedData = validateRegister(req.body);

    const user = await userService.register(validatedData);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error in register:', error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = validateLogin(req.body);
    const token = await userService.login(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const profile = await userService.getProfile(userId);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const validatedData = validateUpdateProfile(req.body);
    const updatedProfile = await userService.updateProfile(userId, validatedData);
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};
