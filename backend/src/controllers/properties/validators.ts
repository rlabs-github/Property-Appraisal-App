// src/controllers/properties/validators.ts
import { body } from 'express-validator';

export const propertyValidator = [
  body('name').isString().trim().notEmpty(),
  body('address').isObject(),
  body('address.street').isString().trim().notEmpty(),
  body('address.city').isString().trim().notEmpty(),
  body('address.state').isString().trim().isLength({ min: 2, max: 2 }),
  body('address.zipCode').isString().trim().matches(/^\d{5}(-\d{4})?$/),
  body('type').isString().isIn(['commercial', 'residential', 'industrial', 'land']),
  body('status').isString().isIn(['active', 'pending', 'archived']),
  body('metadata').optional().isObject(),
];