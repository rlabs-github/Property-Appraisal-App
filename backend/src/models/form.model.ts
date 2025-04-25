// models/form.model.ts
import { FormSection } from '../../src/types/form';

export interface Form {
    id: string;
    name: string;
    description: string;
    sections: FormSection[];
    templateId: string;
    tenantId: string;
    createdById: string;
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
  }
  