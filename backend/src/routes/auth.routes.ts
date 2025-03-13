// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/me', authController.getCurrentUser);

export default router;
