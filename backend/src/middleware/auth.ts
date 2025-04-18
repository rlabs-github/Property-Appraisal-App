// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { firebaseService } from '../services/firebase'; // updated to use firebaseService

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      code: 'auth/missing-token'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await firebaseService.verifyIdToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Invalid or expired token',
      code: 'auth/invalid-token'
    });
  }
};
