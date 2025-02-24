// src/controllers/forms/form.controller.ts (New file)
import { Request, Response, NextFunction } from 'express';
import { FormService } from '@/services/forms/form.service';

export class FormController {
  private formService: FormService;

  constructor() {
    this.formService = new FormService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const form = await this.formService.createForm(tenantId, req.body);
      res.status(201).json(form);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const forms = await this.formService.listForms(tenantId);
      res.json(forms);
    } catch (error) {
      next(error);
    }
  };
}