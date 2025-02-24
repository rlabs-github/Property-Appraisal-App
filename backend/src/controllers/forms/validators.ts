// src/controllers/forms/validators.ts (New file)
import { body } from 'express-validator';

export const formValidator = [
  body('name').isString().trim().notEmpty(),
  body('sections').isArray(),
  body('sections.*.title').isString().trim().notEmpty(),
  body('sections.*.fields').isArray(),
  body('sections.*.fields.*.type').isIn(['text', 'number', 'select', 'calculation']),
  body('sections.*.fields.*.label').isString().trim().notEmpty()
];