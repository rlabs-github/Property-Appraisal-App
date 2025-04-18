// backend/src/routes/api.routes.ts
import { Router } from 'express';
import { propertiesRoutes } from './properties.routes';
import templatesRoutes from './documents.routes'; // assuming the correct file
import { verifyToken } from '../middleware/auth';

const router = Router();

router.use('/properties', verifyToken, propertiesRoutes);
router.use('/templates', verifyToken, templatesRoutes);

export { router as apiRoutes };

