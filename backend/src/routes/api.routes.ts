// backend/src/routes/api.routes.ts
import { Router } from 'express';
import { propertiesRoutes } from './properties.routes';
import { templatesRoutes } from './templates.routes';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use('/properties', authMiddleware, propertiesRoutes);
router.use('/templates', authMiddleware, templatesRoutes);

export { router as apiRoutes };
