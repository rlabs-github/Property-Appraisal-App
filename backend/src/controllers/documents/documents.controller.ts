// src/controllers/documents/document.controller.ts
import { Request, Response, NextFunction } from 'express';
import DocumentService from 'C:/Users/rober/Property-Appraisal-App/backend/src/services/documents/documents.service';

// Extend Express Request to include `tenantId`
declare module 'express-serve-static-core' {
  interface Request {
    tenantId?: string;
  }
}

export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      if (!tenantId) {
        return res.status(400).json({ error: "Missing tenantId" });
      }

      const document = await this.documentService.createDocument(tenantId, req.body);
      res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tenantId } = req;
      if (!tenantId) {
        return res.status(400).json({ error: "Missing tenantId" });
      }

      const documents = await this.documentService.listDocuments(tenantId);
      res.json(documents);
    } catch (error) {
      next(error);
    }
  };
}
