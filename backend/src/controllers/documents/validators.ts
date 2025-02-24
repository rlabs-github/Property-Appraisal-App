// src/controllers/documents/validators.ts
import { body } from 'express-validator';

export const documentValidator = [
  body('name').isString().trim().notEmpty(),
  body('type').isString().trim().isIn(['appraisal', 'report', 'analysis']),
  body('content').exists(),
];

export const templateValidator = [
  body('name').isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('structure').isObject(),
  body('type').isString().isIn(['document', 'form']),
];
