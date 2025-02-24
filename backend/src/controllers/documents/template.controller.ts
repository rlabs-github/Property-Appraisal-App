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
      const template = await this.templateService.createTemplate(tenantId, req.body);
      res.status(201).json(template);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const templates = await this.templateService.listTemplates(tenantId);
      res.json(templates);
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const { id } = req.params;
      const template = await this.templateService.getTemplate(tenantId, id);
      res.json(template);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const { id } = req.params;
      const template = await this.templateService.updateTemplate(tenantId, id, req.body);
      res.json(template);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const { id } = req.params;
      await this.templateService.deleteTemplate(tenantId, id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}