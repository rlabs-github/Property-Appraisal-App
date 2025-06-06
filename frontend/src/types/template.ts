// src/types/template.ts
export interface TemplateSection {
  id: string;
  title: string;
  fields: any[];
  type: string; // define this more strictly if possible
}

export interface DocumentTemplate {
    id: string;
    tenantId: string;
    name: string;
    description: string;
    type: TemplateType;
    format: DocumentFormat;
    version: number;
    content: any;
    placeholders: Placeholder[];
    metadata: Record<string, any>;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;

    sections: TemplateSection[];
  }
  
  export type TemplateType = 'appraisal' | 'inspection' | 'analysis' | 'custom';
  export type DocumentFormat = 'docx' | 'pdf';
  
  export interface Placeholder {
    key: string;
    label: string;
    type: PlaceholderType;
    required: boolean;
    description?: string;
    defaultValue?: any;
  }
  
  export type PlaceholderType = 'text' | 'number' | 'date' | 'currency' | 'calculation';
  