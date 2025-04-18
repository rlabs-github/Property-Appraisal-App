// backend/src/routes/api.routes.ts
import { Router } from 'express';
import { propertiesRoutes } from './properties.routes';
import templatesRoutes from './documents.routes';
import authRoutes from './auth.routes'; // ✅ import auth routes
import { verifyToken } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes); // ✅ add this line to mount /auth/login, /auth/register

router.use('/properties', verifyToken, propertiesRoutes);
router.use('/templates', verifyToken, templatesRoutes);

export { router as apiRoutes };

