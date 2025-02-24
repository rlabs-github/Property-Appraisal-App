// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import { propertiesRoutes } from './properties.routes';
import documentsRoutes from './documents.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertiesRoutes);
router.use('/documents', documentsRoutes);

export default router;