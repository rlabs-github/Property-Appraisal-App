// src/controllers/auth/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../services/auth/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Frontend sends ID token, backend verifies and returns user
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const idToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

      if (!idToken) {
        return res.status(401).json({ message: 'Missing ID token' });
      }

      const result = await this.authService.authenticateByToken(idToken);

      // Optional: Set secure cookie if needed
      res.cookie('token', idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // Optional: remove this unless doing admin-side user provisioning
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(403).json({ message: 'Registration should be handled on the frontend' });
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ user: (req as any).user || null });
    } catch (error) {
      next(error);
    }
  };
}
