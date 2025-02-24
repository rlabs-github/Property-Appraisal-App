// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};