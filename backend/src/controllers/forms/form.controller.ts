// src/controllers/forms/form.controller.ts (New file)
import { Request, Response, NextFunction } from 'express';
import { FormBuilderService } from '../../services/forms/builder.service';

declare module 'express-serve-static-core' {
  interface Request {
    tenantId?: string;
  }
}

export class FormController {
  private formService: FormBuilderService;

  constructor() {
    this.formService = new FormBuilderService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const form = await this.formService.createForm(req.body); // ✅ fixed signature
      res.status(201).json(form);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      if (!tenantId) {
        return res.status(400).json({ error: 'Missing tenantId'})
      }
      const forms = await this.formService.listForms(tenantId); // ✅ pass the tenantId
      res.json(forms);
    } catch (error) {
      next(error);
    }
  };
}