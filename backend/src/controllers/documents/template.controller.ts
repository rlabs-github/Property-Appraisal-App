// src/controllers/documents/template.controller.ts
import { Request, Response, NextFunction } from 'express';
import { TemplateService } from '@/services/documents/template.service';

export class TemplateController {
  private templateService: TemplateService;

  constructor() {
    this.templateService = new TemplateService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      if (!tenantId) return res.status(400).json({ error: 'Tenant ID is required' });

      const template = await this.templateService.createTemplate(req.body);
      res.status(201).json(template);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const templates = await this.templateService.listTemplates();
      res.json(templates);
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const template = await this.templateService.getTemplate(id);
      res.json(template);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const template = await this.templateService.updateTemplate(id, req.body);
      res.json(template);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.templateService.deleteTemplate(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
