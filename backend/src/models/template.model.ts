// models/template.model.ts
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