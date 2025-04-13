// models/form.model.ts
import { FormSection } from '@/types/form';

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
  