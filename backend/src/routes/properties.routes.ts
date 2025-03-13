// backend/src/routes/properties.routes.ts
import { Router } from 'express';
import { PropertiesController } from '../controllers/properties/properties.controller';

const router = Router();
const controller = new PropertiesController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as propertiesRoutes };
