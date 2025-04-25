// src/controllers/documents/document.controller.ts
import { Request, Response, NextFunction } from 'express';
import { DocumentsService } from '../../services/documents/documents.service';

// Extend Express Request to include `tenantId`
declare module 'express-serve-static-core' {
  interface Request {
    tenantId?: string;
  }
}

export class DocumentsController {
  private documentService: DocumentsService;

  constructor() {
    this.documentService = new DocumentsService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId = req.tenantId || req.headers['tenant-id']; // ✅ Check both request object and headers
      if (!tenantId || typeof tenantId !== 'string') {
        console.error("❌ Missing or invalid tenantId in createDocument"); // ✅ Log issue
        return res.status(400).json({ error: "Missing tenantId" });
      }

      const documentData = req.body; // ✅ Ensure req.body is passed as argument
      const document = await this.documentService.createDocument(tenantId, documentData);
      res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId = req.tenantId || req.headers['tenant-id']; // ✅ Check both places
      if (!tenantId || typeof tenantId !== 'string') {
        console.error("❌ Missing or invalid tenantId in listDocuments");
        return res.status(400).json({ error: "Missing tenantId" });
      }

      const documents = await this.documentService.listDocuments(tenantId);
      res.json(documents);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId = req.tenantId || req.headers['tenant-id'];
      const { id } = req.params;

      if (!tenantId || typeof tenantId !== 'string') {
        console.error("❌ Missing or invalid tenantId in getById");
        return res.status(400).json({ error: "Missing tenantId" });
      }

      const document = await this.documentService.getDocumentById(tenantId, id);
      if (!document) {
        console.warn(`⚠️ Document with ID ${id} not found for tenant ${tenantId}`);
        return res.status(404).json({ error: "Document not found" });
      }

      res.json(document);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const docs = await this.documentService.getAllDocuments();
      res.json(docs);
    } catch (error) {
      next(error);
    }
  };
}
