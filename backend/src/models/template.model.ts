// models/template.model.ts
import { TemplateField } from '../../src/types/template'; // or wherever you defined it

export interface Template {
    id: string;
    name: string;
    description: string;
    type: 'report' | 'contract' | 'letter';
    content: Record<string, any>;
    fields: TemplateField[];
    tenantId: string;
    createdById: string;
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
  }