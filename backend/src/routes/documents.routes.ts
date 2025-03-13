// src/routes/documents.routes.ts
import { Router } from 'express';
import { DocumentsController } from '../controllers/documents/documents.controller';

const router = Router();
const documentsController = new DocumentsController();

router.get('/', documentsController.getAll);
router.get('/:id', documentsController.getById);
router.post('/', documentsController.create);

export default router;