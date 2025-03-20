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

  async getDocumentById(tenantId: string, id: string): Promise<Document | null> {
    const query = 'SELECT * FROM documents WHERE tenant_id = $1 AND id = $2';
    const result = await db.query(query, [tenantId, id]);
    return result.rows[0] || null;
  }

  async createDocument(tenantId: string, data: any) {
    const result = await db.query(
      'INSERT INTO documents (tenant_id, name, content) VALUES ($1, $2, $3) RETURNING *',
      [tenantId, data.name, data.content]
    );
    return result.rows[0];
  }  
  
  async listDocuments(tenantId: string): Promise<Document[]> {
    const query = 'SELECT * FROM documents WHERE tenant_id = $1';
    const result = await db.query(query, [tenantId]);
    return result.rows;
  }
}
export default DocumentsService;