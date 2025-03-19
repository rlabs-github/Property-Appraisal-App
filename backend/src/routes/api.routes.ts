// backend/src/routes/api.routes.ts
import { Router } from 'express';
import propertiesRoutes from '../routes';
import templatesRoutes from '../routes';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use('/properties', authMiddleware, propertiesRoutes);
router.use('/templates', authMiddleware, templatesRoutes);

export { router as apiRoutes };
