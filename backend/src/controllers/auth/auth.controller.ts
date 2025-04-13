// src/controllers/auth/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@services/auth/auth.service';
import { LoginCredentials } from 'src/types/auth';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials: LoginCredentials = req.body;
      const result = await this.authService.login(credentials);
      res.cookie('token', result.token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Implement logic to decode JWT or use session
      res.json({ user: req.user || null });
    } catch (error) {
      next(error);
    }
  };
}