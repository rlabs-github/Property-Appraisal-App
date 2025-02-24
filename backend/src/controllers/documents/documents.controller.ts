// src/controllers/documents/document.controller.ts
import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '@/services/documents/document.service';

export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const document = await this.documentService.createDocument(tenantId, req.body);
      res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      const documents = await this.documentService.listDocuments(tenantId);
      res.json(documents);
    } catch (error) {
      next(error);
    }
  };
}