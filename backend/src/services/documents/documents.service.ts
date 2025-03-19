// src/services/documents.service.ts
import db from '@config/database';
import { Document } from '../../types';
import { NotFoundError } from '@utils/errors';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    tenantId?: string;
  }
}

export class DocumentsService {
  async getAllDocuments(): Promise<Document[]> {
    const result = await db.query('SELECT * FROM documents');
    return result.rows;
  }

  async getDocumentById(id: string): Promise<Document> {
    const result = await db.query('SELECT * FROM documents WHERE id = $1', [id]);
    if (!result.rows[0]) {
      throw new NotFoundError('Document not found');
    }
    return result.rows[0];
  }

  async createDocument(data: Partial<Document>): Promise<Document> {
    const result = await db.query(
      'INSERT INTO documents (property_id, type, status, url, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.propertyId, data.type, data.status, data.url, data.createdBy]
    );
    return result.rows[0];
  }
}
export default DocumentsService;